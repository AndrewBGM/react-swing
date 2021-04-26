import Bridge from './bridge'
import { MessageType } from './bridge/messages'

interface Remote {
  host: string

  send: (data: Record<string, unknown>) => void
}

export const buildRemote = (host: string, bridge: Bridge): Remote => ({
  host,

  send: (data: Record<string, unknown>) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bridge.send(MessageType.USER_DEFINED, data),
})

export default Remote
