export const APPEND_INITIAL_CHILD = 'APPEND_INITIAL_CHILD' as const

export const appendInitialChild = (parentId: number, childId: number) => ({
  type: APPEND_INITIAL_CHILD,
  payload: {
    parentId,
    childId,
  },
})

export type AppendInitialChildMessage = ReturnType<typeof appendInitialChild>
