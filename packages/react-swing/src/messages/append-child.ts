export const APPEND_CHILD = 'APPEND_CHILD' as const

export const appendChild = (parentId: number, childId: number) => ({
  type: APPEND_CHILD,
  payload: {
    parentId,
    childId,
  },
})

export type AppendChildMessage = ReturnType<typeof appendChild>
