import { ReactElement } from 'react'
import ReactReconciler from 'react-reconciler'
import configureWebSocket from './configure-web-socket'
import createHostConfig from './create-host-config'

export interface RenderOptions {
  host: string
}

const defaultOptions: RenderOptions = {
  host: 'ws://localhost:8080/ws',
}

const noop = () => {}

export const render = async (
  element: ReactElement,
  options: RenderOptions = defaultOptions,
): Promise<void> => {
  const { host } = options
  const ws = await configureWebSocket(host)
  const ReactSwing = ReactReconciler(createHostConfig(ws))

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const rootContainer = ReactSwing.createContainer(0, 0, false, null)
  ReactSwing.updateContainer(element, rootContainer, null, noop)
}

export * from './components'
