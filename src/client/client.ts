import WebSocket from 'ws'

class Client {
  constructor(readonly host: string, readonly ws: WebSocket) {}

  send(data: Record<string, unknown>): void {
    this.ws.send(JSON.stringify(data))
  }
}

export default Client
