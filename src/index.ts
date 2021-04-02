import type { ReactElement } from 'react'
import ReactReconciler from 'react-reconciler'
import createHostConfig from './create-host-config'
import { configureRPCClient } from './rpc-client'

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
  const rpc = await configureRPCClient(host)
  const hostConfig = createHostConfig(rpc)
  const ReactSwing = ReactReconciler(hostConfig)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const rootContainer = ReactSwing.createContainer(0, 0, false, null)
  ReactSwing.updateContainer(element, rootContainer, null, noop)
}

export * from './components'
