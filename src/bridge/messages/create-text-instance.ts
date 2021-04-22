export interface CreateTextInstanceMessagePayload {
  instanceId: number
  text: string
}

interface CreateTextInstanceMessage {
  type: 'CREATE_TEXT_INSTANCE'
  payload: CreateTextInstanceMessagePayload
}

export default CreateTextInstanceMessage
