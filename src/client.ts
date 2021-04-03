import WebSocket from 'ws'

class ReactSwingClient {
  private nextInstanceId = 1

  constructor(private ws: WebSocket) {}

  filterProps(props: Record<string, unknown>): Record<string, unknown> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children, ...rest } = props
    return rest
  }

  send(type: string, payload: Record<string, unknown>): void {
    this.ws.send(
      JSON.stringify({
        type,
        payload,
      }),
    )
  }

  getNextInstanceId(): number {
    const instanceId = this.nextInstanceId
    this.nextInstanceId += 1

    return instanceId
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
