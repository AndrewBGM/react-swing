export interface InvokeCallbackMessagePayload {
  callbackId: number
  args?: unknown[]
}

interface InvokeCallbackMessage {
  type: 'INVOKE_CALLBACK'
  payload: InvokeCallbackMessagePayload
}

export default InvokeCallbackMessage
