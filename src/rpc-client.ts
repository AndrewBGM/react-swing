import WebSocket from 'ws'

class RPCClient {
  constructor(private ws: WebSocket) {}

  send<T>(method: string, payload: T): void {
    this.ws.send(
      JSON.stringify({
        method,
        payload,
      }),
    )
  }
}

export const configureRPCClient = (host: string): Promise<RPCClient> => {
  const ws = new WebSocket(host)
  return new Promise(resolve => {
    ws.on('ping', data => ws.pong(data))
    ws.on('open', () => resolve(new RPCClient(ws)))
  })
}

export default RPCClient
