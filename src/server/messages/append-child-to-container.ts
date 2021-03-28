export const APPEND_CHILD_TO_CONTAINER = 'APPEND_CHILD_TO_CONTAINER' as const

export const appendChildToContainer = (containerId: number, childId: number) => ({
  type: APPEND_CHILD_TO_CONTAINER,
  payload: {
    containerId,
    childId,
  },
})

export type AppendChildToContainerMessage = ReturnType<typeof appendChildToContainer>
