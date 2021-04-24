import MessageType from './message-type'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StartApplicationMessagePayload {}

interface StartApplicationMessage {
  type: MessageType.START_APPLICATION
  payload: StartApplicationMessagePayload
}

export default StartApplicationMessage
