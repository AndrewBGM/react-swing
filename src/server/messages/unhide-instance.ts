export const UNHIDE_INSTANCE = 'UNHIDE_INSTANCE' as const

export const unhideInstance = (instanceId: number, props: Record<string, unknown>) => ({
  type: UNHIDE_INSTANCE,
  payload: {
    instanceId,
    props,
  },
})

export type UnhideInstanceMessage = ReturnType<typeof unhideInstance>
