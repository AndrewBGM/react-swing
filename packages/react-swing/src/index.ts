import parseOptions from 'minimist'
import type { ReactElement } from 'react'
import ReactReconciler from 'react-reconciler'
import Bridge, { BridgeOptions } from './server/bridge'

const noop = () => {}

export const render = async (element: ReactElement, argv: string[] = []) => {
  const options = parseOptions<BridgeOptions>(argv, {
    default: {
      host: 'ws://localhost:8080/ws',
    },
  })

  const bridge = new Bridge(options)
  await bridge.connect()

  const ReactSwing = ReactReconciler(bridge)
  const rootContainer = ReactSwing.createContainer(0, 0, false, null)
  ReactSwing.updateContainer(element, rootContainer, null, noop)
}

export * from './components'
