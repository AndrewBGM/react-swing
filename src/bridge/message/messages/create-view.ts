export interface CreateViewMessagePayload {
  id: string
  tag: string
  props: Record<string, unknown>
}

interface CreateViewMessage {
  type: 'CREATE_VIEW'
  payload: CreateViewMessagePayload
}

export default CreateViewMessage
