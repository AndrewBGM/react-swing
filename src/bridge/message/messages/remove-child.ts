export interface RemoveChildMessagePayload {
  parentId: string
  childId: string
}

interface RemoveChildMessage {
  type: 'REMOVE_CHILD'
  payload: RemoveChildMessagePayload
}

export default RemoveChildMessage
