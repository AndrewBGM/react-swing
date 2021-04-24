import MessageType from './message-type'

export interface AppendChildMessagePayload {
  parentId: number
  childId: number
}

interface AppendChildMessage {
  type: MessageType.APPEND_CHILD
  payload: AppendChildMessagePayload
}

export default AppendChildMessage
