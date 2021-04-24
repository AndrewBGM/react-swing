import MessageType from './message-type'

export interface RemoveChildMessagePayload {
  parentId: number
  childId: number
}

interface RemoveChildMessage {
  type: MessageType.REMOVE_CHILD
  payload: RemoveChildMessagePayload
}

export default RemoveChildMessage
