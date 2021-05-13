import {
  AppendChildMessage,
  CreateViewMessage,
  InsertChildMessage,
  InvokeCallbackMessage,
  RemoveChildMessage,
  SetChildrenMessage,
  UpdateViewMessage,
} from './messages'

export type Message =
  | CreateViewMessage
  | UpdateViewMessage
  | SetChildrenMessage
  | AppendChildMessage
  | RemoveChildMessage
  | InsertChildMessage
  | InvokeCallbackMessage

export type MessageType = Message['type']

export type MessagePayload<T extends MessageType> = {
  [M in Message as M['type']]: M['payload']
}[T]
