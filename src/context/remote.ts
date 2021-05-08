import { Bridge } from '../bridge'

interface Remote {
  host: string

  close: () => void
}

export const buildRemote = (bridge: Bridge): Remote => ({
  host: bridge.host,

  close: () => bridge.close(),
})

export default Remote
