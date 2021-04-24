import MessageType from './message-type'

export interface CreateInstanceMessagePayload {
  instanceId: number
  type: string
  props: Record<string, unknown>
}

interface CreateInstanceMessage {
  type: MessageType.CREATE_INSTANCE
  payload: CreateInstanceMessagePayload
}

export default CreateInstanceMessage
