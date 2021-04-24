import MessageType from './message-type'

export interface FreeCallbackMessagePayload {
  callbackId: number
}

interface FreeCallbackMessage {
  type: MessageType.FREE_CALLBACK
  payload: FreeCallbackMessagePayload
}

export default FreeCallbackMessage
