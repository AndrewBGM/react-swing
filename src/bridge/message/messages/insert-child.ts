export interface InsertChildMessagePayload {
  parentId: string
  childId: string
  beforeChildId: string
}

interface InsertChildMessage {
  type: 'INSERT_CHILD'
  payload: InsertChildMessagePayload
}

export default InsertChildMessage
