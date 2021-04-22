export interface AppendChildMessagePayload {
  parentId: number
  childId: number
}

interface AppendChildMessage {
  type: 'APPEND_CHILD'
  payload: AppendChildMessagePayload
}

export default AppendChildMessage
