import MessageType from './message-type'

export interface CreateTextInstanceMessagePayload {
  instanceId: number
  text: string
}

interface CreateTextInstanceMessage {
  type: MessageType.CREATE_TEXT_INSTANCE
  payload: CreateTextInstanceMessagePayload
}

export default CreateTextInstanceMessage
