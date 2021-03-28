export const INVOKE_CALLBACK = 'INVOKE_CALLBACK' as const

export const invokeCallback = (callbackId: number, args: unknown[]) => ({
  type: INVOKE_CALLBACK,
  payload: {
    callbackId,
    args,
  },
})

export type InvokeCallbackMessage = ReturnType<typeof invokeCallback>
