export const INSERT_BEFORE = 'INSERT_BEFORE' as const

export const insertBefore = (
  parentId: number,
  childId: number,
  beforeChildId: number
) => ({
  type: INSERT_BEFORE,
  payload: {
    parentId,
    childId,
    beforeChildId,
  },
})

export type InsertBeforeMessage = ReturnType<typeof insertBefore>
