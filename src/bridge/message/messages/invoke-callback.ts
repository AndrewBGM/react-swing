export interface InvokeCallbackMessagePayload {
  id: string
  name: string
  args?: unknown[]
}

interface InvokeCallbackMessage {
  type: 'INVOKE_CALLBACK'
  payload: InvokeCallbackMessagePayload
}

export default InvokeCallbackMessage
