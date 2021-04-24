import MessageType from './message-type'

export interface UnhideTextInstanceMessagePayload {
  instanceId: number
  text: string
}

interface UnhideTextInstanceMessage {
  type: MessageType.UNHIDE_TEXT_INSTANCE
  payload: UnhideTextInstanceMessagePayload
}

export default UnhideTextInstanceMessage
