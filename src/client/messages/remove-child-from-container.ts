export interface RemoveChildFromContainerMessagePayload {
  parentId: number
  childId: number
}

interface RemoveChildFromContainerMessage {
  type: 'REMOVE_CHILD_FROM_CONTAINER'
  payload: RemoveChildFromContainerMessagePayload
}

export default RemoveChildFromContainerMessage
