export const INSERT_IN_CONTAINER_BEFORE = 'INSERT_IN_CONTAINER_BEFORE' as const

export const insertInContainerBefore = (
  containerId: number,
  childId: number,
  beforeChildId: number
) => ({
  type: INSERT_IN_CONTAINER_BEFORE,
  payload: {
    containerId,
    childId,
    beforeChildId,
  },
})

export type InsertInContainerBeforeMessage = ReturnType<
  typeof insertInContainerBefore
>
