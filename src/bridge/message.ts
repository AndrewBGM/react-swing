export interface FreeCallbackMessage {
  type: 'FREE_CALLBACK'
  payload: {
    callbackId: number
  }
}

export interface InvokeCallbackMessage {
  type: 'INVOKE_CALLBACK'
  payload: {
    callbackId: number
    args: unknown[] | undefined
  }
}

export type Message = FreeCallbackMessage | InvokeCallbackMessage

export const parseMessage = (data: string): Message =>
  JSON.parse(data) as Message
