import WebSocket from 'ws'

type Callback = (...args: unknown[]) => unknown

const isCallback = (arg: unknown): arg is Callback => typeof arg === 'function'

const isObject = (arg: unknown): arg is Record<string, unknown> =>
  Object.prototype.toString.call(arg) === '[Object object]'

export type HostType = string
export type HostProps = Record<string, unknown>
export type HostContainer = number
export type HostInstance = number
export type HostTextInstance = number
export type HostSuspenseInstance = number
export type HostHydratableInstance = number
export type HostPublicInstance = number
export type HostContext = Record<string, unknown>
export type HostUpdatePayload = Record<string, unknown>
export type HostChildSet = unknown
export type HostTimeoutHandle = NodeJS.Timeout
export type HostNoTimeout = -1

class ReactSwingBridge {
  private nextInstanceId = 1

  private nextCallbackId = 1

  private callbacksById: Record<number, Callback | undefined> = {}

  constructor(private ws: WebSocket) {}

  createInstance(type: HostType, props: HostProps): HostInstance {
    const instanceId = this.getNextInstanceId()
    this.send('CREATE_INSTANCE', {
      instanceId,
      type,
      props: this.filterProps(props),
    })

    return instanceId
  }

  createTextInstance(text: string): HostTextInstance {
    const instanceId = this.getNextInstanceId()
    this.send('CREATE_TEXT_INSTANCE', {
      instanceId,
      text,
    })

    return instanceId
  }

  appendInitialChild(
    parentId: HostInstance,
    childId: HostInstance | HostTextInstance,
  ): void {
    this.send('APPEND_INITIAL_CHILD', {
      parentId,
      childId,
    })
  }

  appendChild(
    parentId: HostInstance,
    childId: HostInstance | HostTextInstance,
  ): void {
    this.send('APPEND_CHILD', {
      parentId,
      childId,
    })
  }

  appendChildToContainer(
    containerId: HostContainer,
    childId: HostInstance | HostTextInstance,
  ): void {
    this.send('APPEND_CHILD_TO_CONTAINER', {
      containerId,
      childId,
    })
  }

  insertBefore(
    parentId: HostInstance,
    childId: HostInstance | HostTextInstance,
    beforeChildId: HostInstance | HostTextInstance | HostSuspenseInstance,
  ): void {
    this.send('INSERT_BEFORE', {
      parentId,
      childId,
      beforeChildId,
    })
  }

  insertInContainerBefore(
    containerId: HostContainer,
    childId: HostInstance | HostTextInstance,
    beforeChildId: HostInstance | HostTextInstance | HostSuspenseInstance,
  ): void {
    this.send('INSERT_IN_CONTAINER_BEFORE', {
      containerId,
      childId,
      beforeChildId,
    })
  }

  removeChild(
    parentId: HostInstance,
    childId: HostInstance | HostTextInstance | HostSuspenseInstance,
  ): void {
    this.send('REMOVE_CHILD', {
      parentId,
      childId,
    })
  }

  removeChildFromContainer(
    containerId: HostContainer,
    childId: HostInstance | HostTextInstance | HostSuspenseInstance,
  ): void {
    this.send('REMOVE_CHILD_FROM_CONTAINER', {
      containerId,
      childId,
    })
  }

  commitTextUpdate(
    instanceId: HostTextInstance,
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
    instanceId: HostInstance,
    type: HostType,
    prevProps: HostProps,
    nextProps: HostProps,
  ): void {
    this.send('COMMIT_UPDATE', {
      instanceId,
      type,
      prevProps: this.filterProps(prevProps),
      nextProps: this.filterProps(nextProps),
    })
  }

  clearContainer(containerId: HostContainer): void {
    this.send('CLEAR_CONTAINER', {
      containerId,
    })
  }

  invokeCallback(callbackId: number, args: unknown[]): unknown {
    const callback = this.callbacksById[callbackId]
    if (callback) {
      return callback(...args)
    }

    return null
  }

  private send(type: string, payload: Record<string, unknown>): void {
    this.ws.send(
      JSON.stringify({
        type,
        payload,
      }),
    )
  }

  private filterProps(props: HostProps): HostProps {
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
      const callbackId = this.getNextCallbackId()
      this.callbacksById[callbackId] = obj

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
    ws.on('ping', data => ws.pong(data))
    ws.on('open', () => resolve(new ReactSwingBridge(ws)))
  })
}

export default ReactSwingBridge
