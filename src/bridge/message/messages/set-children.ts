export interface SetChildrenMessagePayload {
  parentId: string
  childrenIds: string[]
}

interface SetChildrenMessage {
  type: 'SET_CHILDREN'
  payload: SetChildrenMessagePayload
}

export default SetChildrenMessage
