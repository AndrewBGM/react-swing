export interface CommitTextUpdateMessagePayload {
  instanceId: number
  text: string
}

interface CommitTextUpdateMessage {
  type: 'COMMIT_TEXT_UPDATE'
  payload: CommitTextUpdateMessagePayload
}

export default CommitTextUpdateMessage
