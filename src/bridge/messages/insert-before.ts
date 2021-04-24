import MessageType from './message-type'

export interface InsertBeforeMessagePayload {
  parentId: number
  childId: number
  beforeChildId: number
}

interface InsertBeforeMessage {
  type: MessageType.INSERT_BEFORE
  payload: InsertBeforeMessagePayload
}

export default InsertBeforeMessage
