export interface FreeCallbackMessagePayload {
  callbackId: number
}

interface FreeCallbackMessage {
  type: 'FREE_CALLBACK'
  payload: FreeCallbackMessagePayload
}

export default FreeCallbackMessage
