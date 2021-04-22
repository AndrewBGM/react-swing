export interface InsertBeforeMessagePayload {
  parentId: number
  childId: number
  beforeChildId: number
}

interface InsertBeforeMessage {
  type: 'INSERT_BEFORE'
  payload: InsertBeforeMessagePayload
}

export default InsertBeforeMessage
