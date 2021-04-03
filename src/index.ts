import { ReactElement } from 'react'
import ReactReconciler from 'react-reconciler'
import createHostConfig from './create-host-config'
import { configureWebSocket } from './utils'

export interface RenderOptions {
  host: string
}

const defaultOptions: RenderOptions = {
  host: 'ws://localhost:8080/ws',
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
    ReactSwing.updateContainer(element, rootContainer, null, () => resolve())
  })
}

export * from './components'
