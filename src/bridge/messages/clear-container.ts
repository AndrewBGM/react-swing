import MessageType from './message-type'

export interface ClearContainerMessagePayload {
  instanceId: number
}

interface ClearContainerMessage {
  type: MessageType.CLEAR_CONTAINER
  payload: ClearContainerMessagePayload
}

export default ClearContainerMessage
