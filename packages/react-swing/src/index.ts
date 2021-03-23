import parseOptions from 'minimist'
import type { ReactElement } from 'react'
import ReactReconciler from 'react-reconciler'
import WebSocket from 'ws'
import Bridge from './server/bridge'

export type RenderOptions = {
  host: string
}

const noop = () => {}

export const render = (element: ReactElement, argv: string[] = []) => {
  const { host } = parseOptions<RenderOptions>(argv, {
    default: {
      host: 'ws://localhost:8080/ws',
    },
  })

  const ws = new WebSocket(host)
  const bridge = new Bridge(ws)

  const ReactSwing = ReactReconciler(bridge)
  const rootContainer = ReactSwing.createContainer(0, 0, false, null)
  ReactSwing.updateContainer(element, rootContainer, null, noop)
}

export * from './components'
