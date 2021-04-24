import MessageType from './message-type'

export interface RemoveChildFromContainerMessagePayload {
  parentId: number
  childId: number
}

interface RemoveChildFromContainerMessage {
  type: MessageType.REMOVE_CHILD_FROM_CONTAINER
  payload: RemoveChildFromContainerMessagePayload
}

export default RemoveChildFromContainerMessage
