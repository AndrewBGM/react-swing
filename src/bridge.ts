import WebSocket from 'ws'

export type BridgeType = string
export type BridgeProps = Record<string, unknown>
export type BridgeContainer = number
export type BridgeInstance = number
export type BridgeTextInstance = number
export type BridgeSuspenseInstance = number
export type BridgeHydratableInstance = number
export type BridgePublicInstance = number
export type BridgeHostContext = Record<string, unknown>
export type BridgeUpdatePayload = Record<string, unknown>
export type BridgeChildSet = unknown
export type BridgeTimeoutHandle = NodeJS.Timeout
export type BridgeNoTimeout = -1

const withoutChildren = (props: BridgeProps): Omit<BridgeProps, 'children'> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, ...rest } = props
  return rest
}

interface CachedCallback {
  id: number

  invoke: CallableFunction
}

class Bridge {
  private nextCallbackId = 1

  private cachedCallbacks: CachedCallback[] = []

  private nextInstanceId = 1

  constructor(private ws: WebSocket) {
    ws.on('ping', data => ws.pong(data))
  }

  createInstance(type: BridgeType, props: BridgeProps): BridgeInstance {
    const instanceId = this.generateInstanceId()
    this.send('CREATE_INSTANCE', {
      instanceId,
      type,
      props: withoutChildren(props),
    })

    return instanceId
  }

  createTextInstance(text: string): BridgeTextInstance {
    const instanceId = this.generateInstanceId()
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
    const changedProps: Record<string, unknown> = {}
    const keys = new Set([...Object.keys(oldProps), ...Object.keys(newProps)])

    keys.forEach(key => {
      const oldValue = oldProps[key]
      const newValue = newProps[key]

      if (oldValue !== newValue) {
        changedProps[key] = newValue === undefined ? null : newValue
      }
    })

    const needsUpdate = Object.keys(changedProps).length > 0
    if (!needsUpdate) {
      return null
    }

    return {
      type,
      changedProps: withoutChildren(changedProps),
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
      updatePayload,
    })
  }

  clearContainer(containerId: BridgeContainer): void {
    this.send('CLEAR_CONTAINER', {
      containerId,
    })
  }

  private send(type: string, payload: Record<string, unknown>): void {
    this.ws.send({
      type,
      payload: this.patchPayload(payload),
    })
  }

  private patchPayload<T extends unknown>(payload: T): T {
    if (Array.isArray(payload)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return payload.map(x => this.patchPayload(x)) as T
    }

    if (Object.prototype.toString.call(payload) === '[object Object]') {
      const obj = payload as Record<string, unknown>
      return Object.keys(obj).reduce((current, key) => {
        const value = this.patchPayload(obj[key])

        return {
          ...current,
          [key]: value,
        }
      }, {}) as T
    }

    if (typeof payload === 'function') {
      const existing = this.cachedCallbacks.find(x => x.invoke === payload)
      if (existing) {
        return existing.id as T
      }

      return this.cacheCallback(payload) as T
    }

    return payload
  }

  private cacheCallback(invoke: CallableFunction): number {
    const id = this.nextCallbackId
    this.nextCallbackId += 1

    this.cachedCallbacks.push({
      id,
      invoke,
    })

    return id
  }

  private generateInstanceId(): number {
    const id = this.nextInstanceId
    this.nextInstanceId += 1

    return id
  }
}

export default Bridge
