import { ReactElement } from 'react'
import ReactReconciler from 'react-reconciler'
import WebSocket from 'ws'
import createHostConfig from './create-host-config'

export interface RenderOptions {
  host: string
}

const defaultOptions: RenderOptions = {
  host: 'ws://localhost:8080/ws',
}

const configureWebSocket = (host: string): Promise<WebSocket> => {
  const ws = new WebSocket(host)
  return new Promise(resolve => {
    ws.on('ping', data => ws.pong(data))
    ws.on('open', () => resolve(ws))
  })
}

export const render = async (
  element: ReactElement,
  options: RenderOptions = defaultOptions,
): Promise<void> => {
  const { host } = options
  const ws = await configureWebSocket(host)

  return new Promise(resolve => {
    const ReactSwing = ReactReconciler(createHostConfig(ws))

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const rootContainer = ReactSwing.createContainer(0, 0, false, null)
    ReactSwing.updateContainer(element, rootContainer, null, resolve)
  })
}

export * from './components'
