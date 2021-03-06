import { PropsWithChildren } from 'react'
import { v4 as uuid } from 'uuid'
import WebSocket from 'ws'
import { shallowDiff, withoutChildren } from '../utils'
import {
  decodeMessage,
  encodeMessage,
  MessagePayload,
  MessageType,
  UpdateViewMessagePayload,
} from './message'
import BridgeView from './view'

export type BridgeType = string
export type BridgeProps = PropsWithChildren<Record<string, unknown>>
export type BridgeUpdatePayload = Omit<UpdateViewMessagePayload, 'id'>

class Bridge {
  private viewById: Record<string, BridgeView> = {}

  constructor(readonly host: string, private ws: WebSocket) {
    ws.on('ping', data => ws.pong(data))
    ws.on('message', data => this.handleMessage(String(data)))
  }

  close(): void {
    this.ws.close()
  }

  createView(type: BridgeType, props: BridgeProps): BridgeView {
    const id = uuid()
    const view = new BridgeView(id)

    this.viewById[id] = view
    view.syncCallbacks(props)

    this.send('CREATE_VIEW', {
      id,
      type,
      props: withoutChildren(props),
    })

    return view
  }

  prepareUpdate(
    oldProps: BridgeProps,
    newProps: BridgeProps,
  ): BridgeUpdatePayload | null {
    const prevProps = withoutChildren(oldProps)
    const nextProps = withoutChildren(newProps)
    const changedProps = shallowDiff(prevProps, nextProps)

    const needsUpdate = Object.keys(changedProps).length > 0
    if (!needsUpdate) {
      return null
    }

    return {
      changedProps,
    }
  }

  updateView(view: BridgeView, payload: BridgeUpdatePayload): void {
    const { changedProps } = payload

    view.syncCallbacks(changedProps)

    this.send('UPDATE_VIEW', {
      id: view.id,
      changedProps,
    })
  }

  appendInitialChild(parent: BridgeView, child: BridgeView): void {
    parent.appendChild(child)
  }

  finalizeInitialChildren(parent: BridgeView): boolean {
    const childrenIds = parent.getChildren().map(x => x.id)
    if (childrenIds.length === 0) {
      return false
    }

    this.send('SET_CHILDREN', {
      parentId: parent.id,
      childrenIds,
    })

    return false
  }

  appendChild(parent: BridgeView, child: BridgeView): void {
    parent.appendChild(child)

    this.send('APPEND_CHILD', {
      parentId: parent.id,
      childId: child.id,
    })
  }

  removeChild(parent: BridgeView, child: BridgeView): void {
    parent.removeChild(child)

    this.send('REMOVE_CHILD', {
      parentId: parent.id,
      childId: child.id,
    })

    this.removeHostReferences(child)
  }

  insertChild(
    parent: BridgeView,
    child: BridgeView,
    beforeChild: BridgeView,
  ): void {
    parent.insertBefore(child, beforeChild)

    this.send('INSERT_CHILD', {
      parentId: parent.id,
      childId: child.id,
      beforeChildId: beforeChild.id,
    })
  }

  private send<T extends MessageType>(
    type: T,
    payload: MessagePayload<T>,
  ): void {
    this.ws.send(encodeMessage(type, payload))
  }

  private handleMessage(data: string): void {
    const message = decodeMessage(data)
    switch (message.type) {
      case 'INVOKE_CALLBACK': {
        const { id, name, args = [] } = message.payload
        this.invokeCallback(id, name, args)
        break
      }
      default:
        break
    }
  }

  private removeHostReferences(view: BridgeView): void {
    const { id } = view

    view.getChildren().forEach(x => this.removeHostReferences(x))
    view.clearCallbacks()
    delete this.viewById[id]
  }

  private invokeCallback(id: string, name: string, args: unknown[]): void {
    const view = this.viewById[id]
    if (!view) {
      return
    }

    view.invokeCallback(name, args)
  }
}

export default Bridge
