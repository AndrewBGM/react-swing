export const CREATE_INSTANCE = 'CREATE_INSTANCE' as const

export const createInstance = (
  instanceId: number,
  type: string,
  props: Record<string, unknown>
) => ({
  type: CREATE_INSTANCE,
  payload: {
    instanceId,
    type,
    props,
  },
})

export type CreateInstanceMessage = ReturnType<typeof createInstance>
