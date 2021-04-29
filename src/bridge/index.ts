import WebSocket from 'ws'
import Instance, { getInstanceIds } from './instance'
import { encodeMessage, MessagePayload, MessageType } from './messages'
import {
  isArray,
  isFunction,
  isObject,
  shallowDiff,
  withoutChildren,
} from './utils'

export type BridgeContainer = number
export type BridgeInstance = Instance
export type BridgeType = string
export type BridgeProps = Record<string, unknown>

export interface BridgeUpdatePayload {
  instanceId: number
  oldProps: Record<string, unknown>
  newProps: Record<string, unknown>
}

class Bridge {
  private nextInstanceId = 1

  constructor(readonly host: string, private ws: WebSocket) {
    ws.on('ping', data => ws.pong(data))
  }

  createInstance(type: BridgeType, props: BridgeProps): BridgeInstance {
    const instanceId = this.nextInstanceId
    this.nextInstanceId += 1

    this.send(MessageType.CREATE_INSTANCE, {
      instanceId,
      type,
      props: withoutChildren(props),
    })

    return new Instance(instanceId)
  }

  createTextInstance(text: string): BridgeInstance {
    const instanceId = this.nextInstanceId
    this.nextInstanceId += 1
    this.send(MessageType.CREATE_TEXT_INSTANCE, {
      instanceId,
      text,
    })

    return new Instance(instanceId)
  }

  appendInitialChild(parent: BridgeInstance, child: BridgeInstance): void {
    const [parentId, childId] = getInstanceIds(parent, child)

    this.send(MessageType.APPEND_INITIAL_CHILD, {
      parentId,
      childId,
    })
  }

  prepareUpdate(
    instance: BridgeInstance,
    oldProps: BridgeProps,
    newProps: BridgeProps,
  ): BridgeUpdatePayload | null {
    const patchedOldProps = withoutChildren(oldProps)
    const patchedNewProps = withoutChildren(newProps)

    const diffedProps = shallowDiff(patchedOldProps, patchedNewProps)
    if (Object.keys(diffedProps).length === 0) {
      return null
    }

    const [instanceId] = getInstanceIds(instance)

    return {
      instanceId,
      oldProps: patchedOldProps,
      newProps: patchedNewProps,
    }
  }

  appendChild(parent: BridgeInstance, child: BridgeInstance): void {
    const [parentId, childId] = getInstanceIds(parent, child)

    this.send(MessageType.APPEND_CHILD, {
      parentId,
      childId,
    })
  }

  appendChildToContainer(
    parentId: BridgeContainer,
    child: BridgeInstance,
  ): void {
    const [childId] = getInstanceIds(child)

    this.send(MessageType.APPEND_CHILD_TO_CONTAINER, {
      parentId,
      childId,
    })
  }

  insertBefore(
    parent: BridgeInstance,
    child: BridgeInstance,
    beforeChild: BridgeInstance,
  ): void {
    const [parentId, childId, beforeChildId] = getInstanceIds(
      parent,
      child,
      beforeChild,
    )

    this.send(MessageType.INSERT_BEFORE, {
      parentId,
      childId,
      beforeChildId,
    })
  }

  insertInContainerBefore(
    parentId: BridgeContainer,
    child: BridgeInstance,
    beforeChild: BridgeInstance,
  ): void {
    const [childId, beforeChildId] = getInstanceIds(child, beforeChild)

    this.send(MessageType.INSERT_IN_CONTAINER_BEFORE, {
      parentId,
      childId,
      beforeChildId,
    })
  }

  removeChild(parent: BridgeInstance, child: BridgeInstance): void {
    const [parentId, childId] = getInstanceIds(parent, child)

    this.send(MessageType.REMOVE_CHILD, {
      parentId,
      childId,
    })
  }

  removeChildFromContainer(
    parentId: BridgeContainer,
    child: BridgeInstance,
  ): void {
    const [childId] = getInstanceIds(child)

    this.send(MessageType.REMOVE_CHILD_FROM_CONTAINER, {
      parentId,
      childId,
    })
  }

  commitTextUpdate(instance: BridgeInstance, text: string): void {
    const [instanceId] = getInstanceIds(instance)

    this.send(MessageType.COMMIT_TEXT_UPDATE, {
      instanceId,
      text,
    })
  }

  commitUpdate(updatePayload: BridgeUpdatePayload): void {
    this.send(MessageType.COMMIT_UPDATE, updatePayload)
  }

  hideInstance(instance: BridgeInstance): void {
    const [instanceId] = getInstanceIds(instance)

    this.send(MessageType.HIDE_INSTANCE, {
      instanceId,
    })
  }

  hideTextInstance(instance: BridgeInstance): void {
    const [instanceId] = getInstanceIds(instance)

    this.send(MessageType.HIDE_TEXT_INSTANCE, {
      instanceId,
    })
  }

  unhideInstance(instance: BridgeInstance, props: BridgeProps): void {
    const [instanceId] = getInstanceIds(instance)

    this.send(MessageType.UNHIDE_INSTANCE, {
      instanceId,
      props: withoutChildren(props),
    })
  }

  unhideTextInstance(instance: BridgeInstance, text: string): void {
    const [instanceId] = getInstanceIds(instance)

    this.send(MessageType.UNHIDE_TEXT_INSTANCE, {
      instanceId,
      text,
    })
  }

  clearContainer(instanceId: BridgeContainer): void {
    this.send(MessageType.CLEAR_CONTAINER, {
      instanceId,
    })
  }

  send<T extends MessageType>(type: T, payload: MessagePayload<T>): void {
    this.ws.send(encodeMessage(type, this.patchPayload(payload)))
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

    if (isFunction(payload)) {
      // Discard the callback.
      // TODO: Need a system here.
      return null as T
    }

    return payload
  }
}

export const configureBridge = (host: string): Promise<Bridge> =>
  new Promise((resolve, reject) => {
    const ws = new WebSocket(host)

    const handleOpen = () => resolve(new Bridge(host, ws))
    const handleError = (err: Error) => reject(err)

    ws.once('open', handleOpen)
    ws.once('error', handleError)
  })

export default Bridge
