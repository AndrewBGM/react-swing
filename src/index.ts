import { ReactNode } from 'react'
import ReactReconciler from 'react-reconciler'
import WebSocket from 'ws'
import Bridge from './bridge'
import createHostConfig from './create-host-config'

const configureBridge = (host: string): Promise<Bridge> =>
  new Promise(resolve => {
    const ws = new WebSocket(host)
    ws.once('open', () => resolve(new Bridge(ws)))
  })

export const render = async (
  element: ReactNode,
  host: string,
): Promise<void> => {
  const bridge = await configureBridge(host)

  return new Promise(resolve => {
    const hostConfig = createHostConfig(bridge)
    const ReactSwing = ReactReconciler(hostConfig)

    const handleReady = () => {
      bridge.startApplication()
      resolve()
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const root = ReactSwing.createContainer(0, 0, false, null)
    ReactSwing.updateContainer(element, root, null, handleReady)
  })
}

export * from './components'
