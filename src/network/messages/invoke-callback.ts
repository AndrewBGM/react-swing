import MessageType from './message-type'

interface InvokeCallbackMessage {
  type: MessageType.INVOKE_CALLBACK
  payload: {
    callbackId: number
    args: unknown[]
  }
}

export default InvokeCallbackMessage
