import { Message, MessagePayload, MessageType } from './message'

export const decodeMessage = (data: string): Message =>
  JSON.parse(data) as Message

export const encodeMessage = <T extends MessageType>(
  type: T,
  payload: MessagePayload<T>,
): string =>
  JSON.stringify({
    type,
    payload,
  })
