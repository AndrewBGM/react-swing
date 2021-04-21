import WebSocket from 'ws'
import { parseMessage } from './message'

export type BridgeType = string
export type BridgeProps = Record<string, unknown>
export type BridgeContainer = number
export type BridgeInstance = number
export type BridgeTextInstance = number
export type BridgeSuspenseInstance = number
export type BridgeUpdatePayload = Record<string, unknown>

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
    ws.on('message', data => this.handleMessage(data.toString()))
  }

  createInstance(type: BridgeType, props: BridgeProps): BridgeInstance {
    const instanceId = this.generateInstanceId()
    this.send('CREATE_INSTANCE', {
      instanceId,
      type,
      props,
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

  commitTextUpdate(instanceId: BridgeTextInstance, text: string): void {
    this.send('COMMIT_TEXT_UPDATE', {
      instanceId,
      text,
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

  startApplication(): void {
    this.send('START_APPLICATION')
  }

  private handleMessage(data: string) {
    const obj = parseMessage(data)

    switch (obj.type) {
      case 'FREE_CALLBACK': {
        const { callbackId } = obj.payload
        const idx = this.cachedCallbacks.findIndex(x => x.id === callbackId)
        if (idx >= 0) {
          this.cachedCallbacks.splice(idx, 1)
        }

        break
      }

      case 'INVOKE_CALLBACK': {
        const { callbackId, args = [] } = obj.payload
        const callback = this.cachedCallbacks.find(x => x.id === callbackId)
        if (callback) {
          callback.invoke(...args)
        }

        break
      }

      default:
        break
    }
  }

  private send(type: string, payload: Record<string, unknown> = {}): void {
    this.ws.send(
      JSON.stringify({
        type,
        payload: this.patchPayload(payload),
      }),
    )
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
