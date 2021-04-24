import MessageType from './message-type'

export interface CommitTextUpdateMessagePayload {
  instanceId: number
  text: string
}

interface CommitTextUpdateMessage {
  type: MessageType.COMMIT_TEXT_UPDATE
  payload: CommitTextUpdateMessagePayload
}

export default CommitTextUpdateMessage
