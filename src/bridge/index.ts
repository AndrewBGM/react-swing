import WebSocket from 'ws'
import CallbackManager from './callback-manager'
import InstanceManager from './instance-manager'
import { decodeMessage, encodeMessage, Message } from './messages'

export type BridgeType = string
export type BridgeProps = Record<string, unknown>
export type BridgeInstance = number

export interface BridgeUpdatePayload {
  instanceId: BridgeInstance
  oldProps: Record<string, unknown>
  newProps: Record<string, unknown>
}

const withoutChildren = (props: BridgeProps): Omit<BridgeProps, 'children'> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, ...rest } = props
  return rest
}

class Bridge {
  private callbackManager = new CallbackManager()

  private instanceManager = new InstanceManager()

  constructor(private ws: WebSocket) {
    ws.on('ping', data => ws.pong(data))
    ws.on('message', data => this.handleMessage(data.toString()))
  }

  createInstance(type: BridgeType, props: BridgeProps): BridgeInstance {
    const instanceId = this.instanceManager.create(type, props)
    this.send({
      type: 'CREATE_INSTANCE',
      payload: {
        instanceId,
        type,
        props: withoutChildren(props),
      },
    })

    return instanceId
  }

  createTextInstance(text: string): BridgeInstance {
    const instanceId = this.instanceManager.createText(text)
    this.send({
      type: 'CREATE_TEXT_INSTANCE',
      payload: {
        instanceId,
        text,
      },
    })

    return instanceId
  }

  prepareUpdate(
    instanceId: BridgeInstance,
    oldProps: BridgeProps,
    newProps: BridgeProps,
  ): BridgeUpdatePayload | null {
    const needsUpdate = Object.keys(newProps)
      .map(key => oldProps[key] !== newProps[key])
      .some(Boolean)

    if (!needsUpdate) {
      return null
    }

    return {
      instanceId,
      oldProps: withoutChildren(oldProps),
      newProps: withoutChildren(newProps),
    }
  }

  appendChild(parentId: BridgeInstance, childId: BridgeInstance): void {
    this.send({
      type: 'APPEND_CHILD',
      payload: {
        parentId,
        childId,
      },
    })
  }

  insertBefore(
    parentId: BridgeInstance,
    childId: BridgeInstance,
    beforeChildId: BridgeInstance,
  ): void {
    this.send({
      type: 'INSERT_BEFORE',
      payload: {
        parentId,
        childId,
        beforeChildId,
      },
    })
  }

  removeChild(parentId: BridgeInstance, childId: BridgeInstance): void {
    this.send({
      type: 'REMOVE_CHILD',
      payload: {
        parentId,
        childId,
      },
    })
  }

  commitTextUpdate(instanceId: BridgeInstance, text: string): void {
    this.send({
      type: 'COMMIT_TEXT_UPDATE',
      payload: {
        instanceId,
        text,
      },
    })
  }

  commitUpdate(payload: BridgeUpdatePayload): void {
    this.send({
      type: 'COMMIT_UPDATE',
      payload,
    })
  }

  clearContainer(instanceId: BridgeInstance): void {
    this.send({
      type: 'CLEAR_CONTAINER',
      payload: {
        instanceId,
      },
    })
  }

  private handleMessage(data: string) {
    const obj = decodeMessage(data)

    switch (obj.type) {
      case 'FREE_CALLBACK': {
        const { callbackId } = obj.payload
        this.callbackManager.free(callbackId)

        break
      }

      case 'INVOKE_CALLBACK': {
        const { callbackId, args = [] } = obj.payload
        this.callbackManager.invoke(callbackId, args)

        break
      }

      default:
        break
    }
  }

  private send({ type, payload }: Message): void {
    const patchedPayload = this.patchPayload(payload)
    this.ws.send(
      encodeMessage({
        type,
        payload: patchedPayload,
      } as Message),
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
      return this.callbackManager.getOrCache(payload) as T
    }

    return payload
  }
}

export default Bridge
