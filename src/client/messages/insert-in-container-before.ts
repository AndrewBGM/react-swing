export interface InsertInContainerBeforeMessagePayload {
  parentId: number
  childId: number
  beforeChildId: number
}

interface InsertInContainerBeforeMessage {
  type: 'INSERT_IN_CONTAINER_BEFORE'
  payload: InsertInContainerBeforeMessagePayload
}

export default InsertInContainerBeforeMessage
