export interface CommitTextUpdateMessagePayload {
  instanceId: number
  oldText: string
  newText: string
}

interface CommitTextUpdateMessage {
  type: 'COMMIT_TEXT_UPDATE'
  payload: CommitTextUpdateMessagePayload
}

export default CommitTextUpdateMessage
