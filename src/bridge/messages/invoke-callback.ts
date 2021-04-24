import MessageType from './message-type'

export interface InvokeCallbackMessagePayload {
  callbackId: number
  args?: unknown[]
}

interface InvokeCallbackMessage {
  type: MessageType.INVOKE_CALLBACK
  payload: InvokeCallbackMessagePayload
}

export default InvokeCallbackMessage
