export interface CreateInstanceMessagePayload {
  instanceId: number
  type: string
  props: Record<string, unknown>
}

interface CreateInstanceMessage {
  type: 'CREATE_INSTANCE'
  payload: CreateInstanceMessagePayload
}

export default CreateInstanceMessage
