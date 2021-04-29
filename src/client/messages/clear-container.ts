export interface ClearContainerMessagePayload {
  instanceId: number
}

interface ClearContainerMessage {
  type: 'CLEAR_CONTAINER'
  payload: ClearContainerMessagePayload
}

export default ClearContainerMessage
