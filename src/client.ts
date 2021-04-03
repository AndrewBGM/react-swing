import WebSocket from 'ws'

class ReactSwingClient {
  constructor(private ws: WebSocket) {}

  send(type: string, payload: Record<string, unknown>): void {
    this.ws.send(
      JSON.stringify({
        type,
        payload,
      }),
    )
  }
}

export const configureClient = (host: string): Promise<ReactSwingClient> => {
  const ws = new WebSocket(host)
  return new Promise(resolve => {
    ws.on('ping', data => ws.pong(data))
    ws.on('open', () => resolve(new ReactSwingClient(ws)))
  })
}

export default ReactSwingClient
