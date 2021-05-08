export interface AppendChildMessagePayload {
  parentId: string
  childId: string
}

interface AppendChildMessage {
  type: 'APPEND_CHILD'
  payload: AppendChildMessagePayload
}

export default AppendChildMessage
