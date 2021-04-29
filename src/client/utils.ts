import WebSocket from 'ws'
import Client from './client'

// eslint-disable-next-line import/prefer-default-export
export const configureClient = (host: string): Promise<Client> =>
  new Promise((resolve, reject) => {
    const ws = new WebSocket(host)
    ws.once('open', () => resolve(new Client(host, ws)))
    ws.once('error', err => reject(err))
  })
