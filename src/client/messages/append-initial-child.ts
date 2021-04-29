export interface AppendInitialChildMessagePayload {
  parentId: number
  childId: number
}

interface AppendInitialChildMessage {
  type: 'APPEND_INITIAL_CHILD'
  payload: AppendInitialChildMessagePayload
}

export default AppendInitialChildMessage
