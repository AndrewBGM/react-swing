import Message from './message'

export type MessageType = Message['type']

type MessagePayloads = {
  [K in Message as K['type']]: K['payload']
}

export type MessagePayload<T extends string> = T extends MessageType
  ? MessagePayloads[T]
  : Record<string, unknown>
