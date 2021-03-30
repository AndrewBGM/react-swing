import MessageType from './message-type'

interface UnhideInstanceMessage {
  type: MessageType.UNHIDE_INSTANCE
  payload: {
    instanceId: number
    props: Record<string, unknown>
  }
}

export default UnhideInstanceMessage
