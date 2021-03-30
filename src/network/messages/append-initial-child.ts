import MessageType from './message-type'

interface AppendInitialChildMessage {
  type: MessageType.APPEND_INITIAL_CHILD
  payload: {
    parentId: number
    childId: number
  }
}

export default AppendInitialChildMessage
