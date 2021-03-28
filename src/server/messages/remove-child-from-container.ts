export const REMOVE_CHILD_FROM_CONTAINER = 'REMOVE_CHILD_FROM_CONTAINER' as const

export const removeChildFromContainer = (containerId: number, childId: number) => ({
  type: REMOVE_CHILD_FROM_CONTAINER,
  payload: {
    containerId,
    childId,
  },
})

export type RemoveChildFromContainerMessage = ReturnType<typeof removeChildFromContainer>
