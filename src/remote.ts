import Bridge from './bridge'

interface Remote {
  host: string

  send: (type: string, payload?: Record<string, unknown>) => void
}

export const buildRemote = (host: string, bridge: Bridge): Remote => ({
  host,

  send: (type: string, payload: Record<string, unknown> = {}) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bridge.send(type as any, payload),
})

export default Remote
