import parseOptions from 'minimist'
import type { ReactElement } from 'react'
import ReactReconciler from 'react-reconciler'
import Bridge, { BridgeOptions } from './server/bridge'

const defaultOptions: BridgeOptions = {
  host: 'ws://localhost:8080/ws',
}

const noop = () => {}

const openBridge = async (options: BridgeOptions): Promise<Bridge> => {
  const bridge = new Bridge(options)
  await bridge.connect()

  return bridge
}

export const render = async (element: ReactElement, argv: string[] = []) => {
  const options = parseOptions<BridgeOptions>(argv, {
    default: defaultOptions,
  })

  const bridge = await openBridge(options)
  const ReactSwing = ReactReconciler(bridge)

  const rootContainer = ReactSwing.createContainer(0, 0, false, null)
  ReactSwing.updateContainer(element, rootContainer, null, noop)
}

export * from './components'
