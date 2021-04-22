export interface RemoveChildMessagePayload {
  parentId: number
  childId: number
}

interface RemoveChildMessage {
  type: 'REMOVE_CHILD'
  payload: RemoveChildMessagePayload
}

export default RemoveChildMessage
