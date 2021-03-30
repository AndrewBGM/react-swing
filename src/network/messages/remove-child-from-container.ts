import MessageType from './message-type'

interface RemoveChildFromContainerMessage {
  type: MessageType.REMOVE_CHILD_FROM_CONTAINER
  payload: {
    containerId: number
    childId: number
  }
}

export default RemoveChildFromContainerMessage
