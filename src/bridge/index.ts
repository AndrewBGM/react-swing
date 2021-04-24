import WebSocket from 'ws'
import CallbackManager from './callback-manager'
import {
  decodeMessage,
  encodeMessage,
  Message,
  MessagePayload,
  MessageType,
} from './messages'
import {
  isArray,
  isFunction,
  isObject,
  shallowDiff,
  withoutChildren,
} from './utils'

export type BridgeType = string
export type BridgeProps = Record<string, unknown>

export interface BridgeUpdatePayload {
  instanceId: number
  oldProps: Record<string, unknown>
  newProps: Record<string, unknown>
}

class Bridge {
  private nextInstanceId = 1

  private cbm = new CallbackManager()

  constructor(private ws: WebSocket) {
    ws.on('ping', data => ws.pong(data))
    ws.on('message', data => this.handleMessage(String(data)))
  }

  createInstance(type: BridgeType, props: BridgeProps): number {
    const instanceId = this.nextInstanceId
    this.nextInstanceId += 1

    this.send(MessageType.CREATE_INSTANCE, {
      instanceId,
      type,
      props: withoutChildren(props),
    })

    return instanceId
  }

  createTextInstance(text: string): number {
    const instanceId = this.nextInstanceId
    this.nextInstanceId += 1
    this.send(MessageType.CREATE_TEXT_INSTANCE, {
      instanceId,
      text,
    })

    return instanceId
  }

  appendInitialChild(parentId: number, childId: number): void {
    this.send(MessageType.APPEND_INITIAL_CHILD, {
      parentId,
      childId,
    })
  }

  prepareUpdate(
    instanceId: number,
    oldProps: BridgeProps,
    newProps: BridgeProps,
  ): BridgeUpdatePayload | null {
    const patchedOldProps = withoutChildren(oldProps)
    const patchedNewProps = withoutChildren(newProps)

    const diffedProps = shallowDiff(patchedOldProps, patchedNewProps)
    if (Object.keys(diffedProps).length === 0) {
      return null
    }

    return {
      instanceId,
      oldProps: patchedOldProps,
      newProps: patchedNewProps,
    }
  }

  appendChild(parentId: number, childId: number): void {
    this.send(MessageType.APPEND_CHILD, {
      parentId,
      childId,
    })
  }

  appendChildToContainer(parentId: number, childId: number): void {
    this.send(MessageType.APPEND_CHILD_TO_CONTAINER, {
      parentId,
      childId,
    })
  }

  insertBefore(parentId: number, childId: number, beforeChildId: number): void {
    this.send(MessageType.INSERT_BEFORE, {
      parentId,
      childId,
      beforeChildId,
    })
  }

  insertInContainerBefore(
    parentId: number,
    childId: number,
    beforeChildId: number,
  ): void {
    this.send(MessageType.INSERT_IN_CONTAINER_BEFORE, {
      parentId,
      childId,
      beforeChildId,
    })
  }

  removeChild(parentId: number, childId: number): void {
    this.send(MessageType.REMOVE_CHILD, {
      parentId,
      childId,
    })
  }

  removeChildFromContainer(parentId: number, childId: number): void {
    this.send(MessageType.REMOVE_CHILD_FROM_CONTAINER, {
      parentId,
      childId,
    })
  }

  commitTextUpdate(instanceId: number, text: string): void {
    this.send(MessageType.COMMIT_TEXT_UPDATE, {
      instanceId,
      text,
    })
  }

  commitUpdate(updatePayload: BridgeUpdatePayload): void {
    this.send(MessageType.COMMIT_UPDATE, updatePayload)
  }

  hideInstance(instanceId: number): void {
    this.send(MessageType.HIDE_INSTANCE, {
      instanceId,
    })
  }

  hideTextInstance(instanceId: number): void {
    this.send(MessageType.HIDE_TEXT_INSTANCE, {
      instanceId,
    })
  }

  unhideInstance(instanceId: number, props: BridgeProps): void {
    this.send(MessageType.UNHIDE_INSTANCE, {
      instanceId,
      props: withoutChildren(props),
    })
  }

  unhideTextInstance(instanceId: number, text: string): void {
    this.send(MessageType.UNHIDE_TEXT_INSTANCE, {
      instanceId,
      text,
    })
  }

  clearContainer(instanceId: number): void {
    this.send(MessageType.CLEAR_CONTAINER, {
      instanceId,
    })
  }

  startApplication(): void {
    this.send(MessageType.START_APPLICATION, {})
  }

  stopApplication(): void {
    this.send(MessageType.STOP_APPLICATION, {})
  }

  send<T extends MessageType>(type: T, payload: MessagePayload<T>): void {
    const patchedPayload = this.patchPayload(payload)

    this.ws.send(
      encodeMessage({
        type,
        payload: patchedPayload,
      } as Message),
    )
  }

  private handleMessage(data: string): void {
    const message = decodeMessage(data)
    switch (message.type) {
      case MessageType.FREE_CALLBACK:
        this.cbm.free(message.payload.callbackId)
        break
      case MessageType.INVOKE_CALLBACK:
        this.cbm.invoke(message.payload.callbackId, message.payload.args)
        break
      default:
        break
    }
  }

  private patchPayload<T extends unknown>(payload: T): T {
    if (isArray(payload)) {
      return payload.map(x => this.patchPayload(x)) as T
    }

    if (isObject(payload)) {
      return Object.keys(payload).reduce((current, key) => {
        const value = payload[key]
        const patchedValue = this.patchPayload(value)

        return {
          ...current,
          [key]: patchedValue,
        }
      }, {}) as T
    }

    // Cache functions and replace with a serializable reference
    if (isFunction(payload)) {
      return this.cbm.fromCache(payload) as T
    }

    return payload
  }
}

export default Bridge
