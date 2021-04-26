import MessageType from './message-type'

export type UserDefinedMessagePayload = Record<string, unknown>

interface UserDefinedMessage {
  type: MessageType.USER_DEFINED
  payload: UserDefinedMessagePayload
}

export default UserDefinedMessage
