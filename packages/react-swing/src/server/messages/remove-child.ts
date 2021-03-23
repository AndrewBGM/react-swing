export const REMOVE_CHILD = 'REMOVE_CHILD' as const

export const removeChild = (parentId: number, childId: number) => ({
  type: REMOVE_CHILD,
  payload: {
    parentId,
    childId,
  },
})

export type RemoveChildMessage = ReturnType<typeof removeChild>
