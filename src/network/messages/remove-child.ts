import MessageType from './message-type'

interface RemoveChildMessage {
  type: MessageType.REMOVE_CHILD
  payload: {
    parentId: number
    childId: number
  }
}

export default RemoveChildMessage
