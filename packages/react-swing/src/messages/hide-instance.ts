export const HIDE_INSTANCE = 'HIDE_INSTANCE' as const

export const hideInstance = (instanceId: number) => ({
  type: HIDE_INSTANCE,
  payload: {
    instanceId,
  },
})

export type HideInstanceMessage = ReturnType<typeof hideInstance>
