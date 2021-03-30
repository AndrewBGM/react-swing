import type { ReactElement } from 'react'
import ReactReconciler from 'react-reconciler'
import createHostConfig from './network/create-host-config'

export interface RenderOptions {
  host: string
}

const defaultOptions: RenderOptions = {
  host: 'ws://localhost:8080/ws',
}

const noop = () => {}

export const render = async (element: ReactElement, options: RenderOptions = defaultOptions) => {
  const { host } = options
  const hostConfig = await createHostConfig(host)
  const ReactSwing = ReactReconciler(hostConfig)

  const rootContainer = ReactSwing.createContainer(0, 0, false, null)
  ReactSwing.updateContainer(element, rootContainer, null, noop)
}

export * from './components'
