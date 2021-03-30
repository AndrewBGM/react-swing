import MessageType from './message-type'

interface ClearContainerMessage {
  type: MessageType.CLEAR_CONTAINER
  payload: {
    containerId: number
  }
}

export default ClearContainerMessage
