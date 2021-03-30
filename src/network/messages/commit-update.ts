import MessageType from './message-type'

interface CommitUpdateMessage {
  type: MessageType.COMMIT_UPDATE
  payload: {
    instanceId: number
    prevProps: Record<string, unknown>
    nextProps: Record<string, unknown>
  }
}

export default CommitUpdateMessage
