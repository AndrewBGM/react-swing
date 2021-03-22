export const CLEAR_CONTAINER = 'CLEAR_CONTAINER' as const

export const clearContainer = (containerId: number) => ({
  type: CLEAR_CONTAINER,
  payload: {
    containerId,
  },
})

export type ClearContainerMessage = ReturnType<typeof clearContainer>
