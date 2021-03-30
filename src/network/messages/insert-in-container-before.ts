import MessageType from './message-type'

interface InsertInContainerBeforeMessage {
  type: MessageType.INSERT_IN_CONTAINER_BEFORE
  payload: {
    containerId: number
    childId: number
    beforeChildId: number
  }
}

export default InsertInContainerBeforeMessage
