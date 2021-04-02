import WebSocket from 'ws'

export type InstanceIdFactory = () => number

export const createInstanceIdFactory = (): InstanceIdFactory => {
  let nextInstanceId = 1
  return () => {
    const instanceId = nextInstanceId
    nextInstanceId += 1

    return instanceId
  }
}

export const filterProps = (
  props: Record<string, unknown>,
): Record<string, unknown> => {
  const { children, ...rest } = props
  if (typeof children === 'string' || typeof children === 'number') {
    return {
      ...rest,
      children: String(children),
    }
  }

  return rest
}

export const sendMessage = (
  ws: WebSocket,
  type: string,
  payload: Record<string, unknown>,
): void =>
  ws.send(
    JSON.stringify({
      type,
      payload,
    }),
  )

export const configureWebSocket = (host: string): Promise<WebSocket> => {
  const ws = new WebSocket(host)
  return new Promise(resolve => {
    ws.on('ping', data => ws.pong(data))
    ws.on('open', () => resolve(ws))
  })
}
