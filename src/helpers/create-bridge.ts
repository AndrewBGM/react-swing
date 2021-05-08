import WebSocket from 'ws'
import { Bridge } from '../bridge'

const createBridge = (host: string): Promise<Bridge> =>
  new Promise((resolve, reject) => {
    const ws = new WebSocket(host)
    ws.once('open', () => {
      ws.removeAllListeners()
      resolve(new Bridge(host, ws))
    }).once('error', err => {
      ws.removeAllListeners()
      reject(err)
    })
  })

export default createBridge
