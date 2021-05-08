export interface UpdateViewMessagePayload {
  id: string
  changedProps: Record<string, unknown>
}

interface UpdateViewMessage {
  type: 'UPDATE_VIEW'
  payload: UpdateViewMessagePayload
}

export default UpdateViewMessage
