import MessageType from './message-type'

export interface InsertInContainerBeforeMessagePayload {
  parentId: number
  childId: number
  beforeChildId: number
}

interface InsertInContainerBeforeMessage {
  type: MessageType.INSERT_IN_CONTAINER_BEFORE
  payload: InsertInContainerBeforeMessagePayload
}

export default InsertInContainerBeforeMessage
