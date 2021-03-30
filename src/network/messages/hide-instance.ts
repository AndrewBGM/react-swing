import MessageType from './message-type'

interface HideInstanceMessage {
  type: MessageType.HIDE_INSTANCE
  payload: {
    instanceId: number
  }
}

export default HideInstanceMessage
