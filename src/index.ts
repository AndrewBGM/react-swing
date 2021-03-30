import type { ReactElement } from 'react'
import ReactReconciler from 'react-reconciler'
import createHostConfig from './network/create-host-config'

const defaultOptions = {
  host: 'ws://localhost:8080/ws',
}

const noop = () => {}

export const render = async (
  element: ReactElement,
  options = defaultOptions
): Promise<void> => {
  const { host } = options
  const hostConfig = await createHostConfig(host)
  const ReactSwing = ReactReconciler(hostConfig)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const rootContainer = ReactSwing.createContainer(0, 0, false, null)
  ReactSwing.updateContainer(element, rootContainer, null, noop)
}

export * from './components'
