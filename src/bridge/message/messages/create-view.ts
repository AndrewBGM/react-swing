export interface CreateViewMessagePayload {
  id: string
  type: string
  props: Record<string, unknown>
}

interface CreateViewMessage {
  type: 'CREATE_VIEW'
  payload: CreateViewMessagePayload
}

export default CreateViewMessage
