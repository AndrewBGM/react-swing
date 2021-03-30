import MessageType from './message-type'

interface InsertBeforeMessage {
  type: MessageType.INSERT_BEFORE
  payload: {
    parentId: number
    childId: number
    beforeChildId: number
  }
}

export default InsertBeforeMessage
