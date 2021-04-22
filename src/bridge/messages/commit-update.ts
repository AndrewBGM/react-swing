export interface CommitUpdateMessagePayload {
  instanceId: number
  oldProps: Record<string, unknown>
  newProps: Record<string, unknown>
}

interface CommitUpdateMessage {
  type: 'COMMIT_UPDATE'
  payload: CommitUpdateMessagePayload
}

export default CommitUpdateMessage
