import WebSocket from 'ws'
import {
  decodeMessage,
  encodeMessage,
  MessagePayload,
  MessageType,
  UpdateViewMessagePayload,
} from './message'

export type BridgeType = string
export type BridgeProps = Record<string, unknown>
export type BridgeView = string
export type BridgeUpdatePayload = Omit<UpdateViewMessagePayload, 'id'>

interface CallbackMap {
  [name: string]: CallableFunction | undefined
}

class Bridge {
  private callbackMapByView: Record<BridgeView, CallbackMap | undefined> = {}

  constructor(readonly host: string, private ws: WebSocket) {
    ws.on('ping', data => ws.pong(data))
    ws.on('message', data => this.handleMessage(String(data)))
  }

  close(): void {
    this.ws.close()
  }

  createView(view: BridgeView, type: BridgeType, props: BridgeProps): void {
    this.syncCallbacks(view, props)

    this.send('CREATE_VIEW', {
      id: view,
      type,
      props,
    })
  }

  updateView(view: BridgeView, payload: BridgeUpdatePayload): void {
    const { changedProps } = payload

    this.syncCallbacks(view, changedProps)

    this.send('UPDATE_VIEW', {
      id: view,
      changedProps,
    })
  }

  setChildren(parent: BridgeView, children: BridgeView[]): void {
    this.send('SET_CHILDREN', {
      parentId: parent,
      childrenIds: children,
    })
  }

  appendChild(parent: BridgeView, child: BridgeView): void {
    this.send('APPEND_CHILD', {
      parentId: parent,
      childId: child,
    })
  }

  removeChild(parent: BridgeView, child: BridgeView): void {
    this.send('REMOVE_CHILD', {
      parentId: parent,
      childId: child,
    })
  }

  insertChild(
    parent: BridgeView,
    child: BridgeView,
    beforeChild: BridgeView,
  ): void {
    this.send('INSERT_CHILD', {
      parentId: parent,
      childId: child,
      beforeChildId: beforeChild,
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

  private syncCallbacks(id: string, props: Record<string, unknown>): void {
    const cbm = this.callbackMapByView[id] ?? {}
    const keys = new Set([...Object.keys(cbm), ...Object.keys(props)])

    keys.forEach(key => {
      if (key in props) {
        const value = props[key]
        if (typeof value === 'function') {
          cbm[key] = value
        } else delete cbm[key]
      }
    })

    if (Object.keys(cbm).length === 0) {
      delete this.callbackMapByView[id]
    } else {
      this.callbackMapByView[id] = cbm
    }
  }

  private invokeCallback(id: string, name: string, args: unknown[]): void {
    const cbm = this.callbackMapByView[id]
    if (!cbm) {
      return
    }

    const cb = cbm[name]
    if (!cb) {
      return
    }

    cb(...args)
  }
}

export default Bridge
