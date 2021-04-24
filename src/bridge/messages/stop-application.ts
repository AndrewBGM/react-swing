import MessageType from './message-type'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StopApplicationMessagePayload {}

interface StopApplicationMessage {
  type: MessageType.STOP_APPLICATION
  payload: StopApplicationMessagePayload
}

export default StopApplicationMessage
