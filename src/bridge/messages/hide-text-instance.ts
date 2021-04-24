import MessageType from './message-type'

export interface HideTextInstanceMessagePayload {
  instanceId: number
}

interface HideTextInstanceMessage {
  type: MessageType.HIDE_TEXT_INSTANCE
  payload: HideTextInstanceMessagePayload
}

export default HideTextInstanceMessage
