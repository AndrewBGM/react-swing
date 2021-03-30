import MessageType from './message-type'

interface AppendChildToContainerMessage {
  type: MessageType.APPEND_CHILD_TO_CONTAINER
  payload: {
    containerId: number
    childId: number
  }
}

export default AppendChildToContainerMessage
