import { ReactElement } from 'react'
import ReactReconciler from 'react-reconciler'
import { configureClient } from './client'
import createHostConfig from './create-host-config'

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
  const client = await configureClient(host)

  return new Promise(resolve => {
    const ReactSwing = ReactReconciler(createHostConfig(client))

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const rootContainer = ReactSwing.createContainer(0, 0, false, null)
    ReactSwing.updateContainer(element, rootContainer, null, () => resolve())
  })
}

export * from './components'
