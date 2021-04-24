import MessageType from './message-type'

export interface HideInstanceMessagePayload {
  instanceId: number
}

interface HideInstanceMessage {
  type: MessageType.HIDE_INSTANCE
  payload: HideInstanceMessagePayload
}

export default HideInstanceMessage
