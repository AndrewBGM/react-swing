export const COMMIT_UPDATE = 'COMMIT_UPDATE' as const

export const commitUpdate = (
  instanceId: number,
  prevProps: Record<string, unknown>,
  nextProps: Record<string, unknown>
) => ({
  type: COMMIT_UPDATE,
  payload: {
    instanceId,
    prevProps,
    nextProps,
  },
})

export type CommitUpdateMessage = ReturnType<typeof commitUpdate>
