export interface AppendChildToContainerMessagePayload {
  parentId: number
  childId: number
}

interface AppendChildToContainerMessage {
  type: 'APPEND_CHILD_TO_CONTAINER'
  payload: AppendChildToContainerMessagePayload
}

export default AppendChildToContainerMessage
