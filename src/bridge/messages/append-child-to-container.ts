import MessageType from './message-type'

export interface AppendChildToContainerMessagePayload {
  parentId: number
  childId: number
}

interface AppendChildToContainerMessage {
  type: MessageType.APPEND_CHILD_TO_CONTAINER
  payload: AppendChildToContainerMessagePayload
}

export default AppendChildToContainerMessage
