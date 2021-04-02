import WebSocket from 'ws'

const configureWebSocket = (host: string): Promise<WebSocket> => {
  const ws = new WebSocket(host)
  return new Promise(resolve => {
    ws.on('ping', data => ws.pong(data))
    ws.on('open', () => resolve(ws))
  })
}

export default configureWebSocket
