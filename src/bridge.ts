import WebSocket from 'ws'

type Callback = (...args: unknown[]) => unknown

const isCallback = (arg: unknown): arg is Callback => typeof arg === 'function'

const isObject = (arg: unknown): arg is Record<string, unknown> =>
  Object.prototype.toString.call(arg) === '[object Object]'

export type BridgeType = string
export type BridgeProps = Record<string, unknown>
export type BridgeContainer = number
export type BridgeInstance = number
export type BridgeTextInstance = number
export type BridgeSuspenseInstance = number
export type BridgeHydratableInstance = number
export type BridgePublicInstance = number
export type BridgeContext = Record<string, unknown>
export type BridgeUpdatePayload = Record<string, unknown>
export type BridgeChildSet = unknown
export type BridgeTimeoutHandle = NodeJS.Timeout
export type BridgeNoTimeout = -1

interface CallbackData {
  id: number
  invoke: Callback
}

type IncomingMessage = {
  type: string
  payload: Record<string, unknown>
}

class ReactSwingBridge {
  private nextInstanceId = 1

  private nextCallbackId = 1

  private mappedCallbacks: CallbackData[] = []

  constructor(private ws: WebSocket) {
    ws.on('ping', data => ws.pong(data))
    ws.on('message', data => this.handleData(String(data)))
  }

  startApplication(containerId: number): void {
    this.send('START_APPLICATION', {
      containerId,
    })
  }

  createInstance(type: BridgeType, props: BridgeProps): BridgeInstance {
    const instanceId = this.getNextInstanceId()
    this.send('CREATE_INSTANCE', {
      instanceId,
      type,
      props: this.filterProps(props),
    })

    return instanceId
  }

  createTextInstance(text: string): BridgeTextInstance {
    const instanceId = this.getNextInstanceId()
    this.send('CREATE_TEXT_INSTANCE', {
      instanceId,
      text,
    })

    return instanceId
  }

  appendInitialChild(
    parentId: BridgeInstance,
    childId: BridgeInstance | BridgeTextInstance,
  ): void {
    this.send('APPEND_INITIAL_CHILD', {
      parentId,
      childId,
    })
  }

  prepareUpdate(
    type: BridgeType,
    oldProps: BridgeProps,
    newProps: BridgeProps,
  ): BridgeUpdatePayload | null {
    const prevProps = this.filterProps(oldProps)
    const nextProps = this.filterProps(newProps)
    const allKeys = [...Object.keys(prevProps), ...Object.keys(nextProps)]
    const changedProps: Record<string, unknown> = {}

    allKeys.forEach(key => {
      const prevValue = prevProps[key]
      const nextValue = nextProps[key]

      if (prevValue !== nextValue) {
        changedProps[key] = nextValue
      }
    })

    if (Object.keys(changedProps).length === 0) {
      return null
    }

    return {
      type,
      changedProps,
    }
  }

  appendChild(
    parentId: BridgeInstance,
    childId: BridgeInstance | BridgeTextInstance,
  ): void {
    this.send('APPEND_CHILD', {
      parentId,
      childId,
    })
  }

  appendChildToContainer(
    containerId: BridgeContainer,
    childId: BridgeInstance | BridgeTextInstance,
  ): void {
    this.send('APPEND_CHILD_TO_CONTAINER', {
      containerId,
      childId,
    })
  }

  insertBefore(
    parentId: BridgeInstance,
    childId: BridgeInstance | BridgeTextInstance,
    beforeChildId: BridgeInstance | BridgeTextInstance | BridgeSuspenseInstance,
  ): void {
    this.send('INSERT_BEFORE', {
      parentId,
      childId,
      beforeChildId,
    })
  }

  insertInContainerBefore(
    containerId: BridgeContainer,
    childId: BridgeInstance | BridgeTextInstance,
    beforeChildId: BridgeInstance | BridgeTextInstance | BridgeSuspenseInstance,
  ): void {
    this.send('INSERT_IN_CONTAINER_BEFORE', {
      containerId,
      childId,
      beforeChildId,
    })
  }

  removeChild(
    parentId: BridgeInstance,
    childId: BridgeInstance | BridgeTextInstance | BridgeSuspenseInstance,
  ): void {
    this.send('REMOVE_CHILD', {
      parentId,
      childId,
    })
  }

  removeChildFromContainer(
    containerId: BridgeContainer,
    childId: BridgeInstance | BridgeTextInstance | BridgeSuspenseInstance,
  ): void {
    this.send('REMOVE_CHILD_FROM_CONTAINER', {
      containerId,
      childId,
    })
  }

  commitTextUpdate(
    instanceId: BridgeTextInstance,
    oldText: string,
    newText: string,
  ): void {
    this.send('COMMIT_TEXT_UPDATE', {
      instanceId,
      oldText,
      newText,
    })
  }

  commitUpdate(
    instanceId: BridgeInstance,
    updatePayload: BridgeUpdatePayload,
  ): void {
    this.send('COMMIT_UPDATE', {
      instanceId,
      ...updatePayload,
    })
  }

  clearContainer(containerId: BridgeContainer): void {
    this.send('CLEAR_CONTAINER', {
      containerId,
    })
  }

  invokeCallback(callbackId: number, args: unknown[]): unknown {
    const callback = this.mappedCallbacks.find(x => x.id === callbackId)
    if (callback) {
      return callback.invoke(...args)
    }

    return null
  }

  freeCallback(callbackId: number): void {
    const idx = this.mappedCallbacks.findIndex(x => x.id === callbackId)
    if (idx >= 0) {
      this.mappedCallbacks.splice(idx, 1)
    }
  }

  private handleData(data: string) {
    const message = JSON.parse(data) as IncomingMessage
    if (message.type === 'INVOKE_CALLBACK') {
      const { callbackId, args } = message.payload
      this.invokeCallback(callbackId as number, args as unknown[])
    }
  }

  private send(type: string, payload: Record<string, unknown> = {}): void {
    this.ws.send(
      JSON.stringify({
        type,
        payload,
      }),
    )
  }

  private filterProps(props: BridgeProps): BridgeProps {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children, ...rest } = props
    return this.mapCallbacks(rest)
  }

  private mapCallbacks<T>(obj: T): T {
    if (Array.isArray(obj)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return (obj.map(x => this.mapCallbacks(x)) as unknown) as T
    }

    if (isCallback(obj)) {
      const existingCallbackData = this.mappedCallbacks.find(
        x => x.invoke === obj,
      )

      if (existingCallbackData) {
        return (existingCallbackData.id as unknown) as T
      }

      const callbackId = this.getNextCallbackId()
      this.mappedCallbacks.push({
        id: callbackId,
        invoke: obj,
      })

      return (callbackId as unknown) as T
    }

    if (isObject(obj)) {
      return Object.keys(obj).reduce((current, key) => {
        const value = obj[key]

        return {
          ...current,
          [key]: this.mapCallbacks(value),
        }
      }, {} as T)
    }

    return obj
  }

  private getNextInstanceId(): number {
    const instanceId = this.nextInstanceId
    this.nextInstanceId += 1

    return instanceId
  }

  private getNextCallbackId(): number {
    const callbackId = this.nextCallbackId
    this.nextCallbackId += 1

    return callbackId
  }
}

export const configureBridge = (host: string): Promise<ReactSwingBridge> => {
  const ws = new WebSocket(host)
  return new Promise(resolve => {
    ws.once('open', () => resolve(new ReactSwingBridge(ws)))
  })
}

export default ReactSwingBridge
