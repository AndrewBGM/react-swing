import MessageType from './message-type'

export interface UnhideInstanceMessagePayload {
  instanceId: number
  props: Record<string, unknown>
}

interface UnhideInstanceMessage {
  type: MessageType.UNHIDE_INSTANCE
  payload: UnhideInstanceMessagePayload
}

export default UnhideInstanceMessage
