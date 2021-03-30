import MessageType from './message-type'

interface AppendChildMessage {
  type: MessageType.APPEND_CHILD
  payload: {
    parentId: number
    childId: number
  }
}

export default AppendChildMessage
