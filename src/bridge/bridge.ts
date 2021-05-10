import { PropsWithChildren } from 'react'
import WebSocket from 'ws'
import {
  decodeMessage,
  encodeMessage,
  MessagePayload,
  MessageType,
  UpdateViewMessagePayload,
} from './message'
import BridgeView from './view'

export type BridgeTag = string
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

  createView(id: string, tag: BridgeTag, props: BridgeProps): BridgeView {
    const view = new BridgeView(id, tag)

    this.viewById[id] = view
    view.syncCallbacks(props)

    this.send('CREATE_VIEW', {
      id,
      tag,
      props,
    })

    return view
  }

  updateView(view: BridgeView, payload: BridgeUpdatePayload): void {
    const { changedProps } = payload

    view.syncCallbacks(changedProps)

    this.send('UPDATE_VIEW', {
      id: view.id,
      changedProps,
    })
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
        const { id, name, args } = message.payload
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
