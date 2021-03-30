import MessageType from './message-type'

interface CreateInstanceMessage {
  type: MessageType.CREATE_INSTANCE
  payload: {
    instanceId: number
    type: string
    props: Record<string, unknown>
  }
}

export default CreateInstanceMessage
