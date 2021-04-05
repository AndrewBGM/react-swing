import { ReactElement } from 'react'
import ReactReconciler from 'react-reconciler'
import { configureBridge } from './bridge'
import createHostConfig from './create-host-config'

export interface StartOptions {
  host: string
}

const ROOT_CONTAINER_ID = 0

const defaultOptions: StartOptions = {
  host: 'ws://localhost:8080',
}

export const startApplication = async (
  element: ReactElement,
  options: StartOptions = defaultOptions,
): Promise<void> => {
  const { host } = options
  const bridge = await configureBridge(host)

  return new Promise(resolve => {
    const ReactSwing = ReactReconciler(createHostConfig(bridge))

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const rootContainer = ReactSwing.createContainer(
      ROOT_CONTAINER_ID,
      0,
      false,
      null,
    )

    ReactSwing.updateContainer(element, rootContainer, null, () => {
      bridge.startApplication(ROOT_CONTAINER_ID)
      resolve()
    })
  })
}

export * from './components'
