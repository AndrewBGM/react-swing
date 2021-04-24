import MessageType from './message-type'

export interface AppendInitialChildMessagePayload {
  parentId: number
  childId: number
}

interface AppendInitialChildMessage {
  type: MessageType.APPEND_INITIAL_CHILD
  payload: AppendInitialChildMessagePayload
}

export default AppendInitialChildMessage
