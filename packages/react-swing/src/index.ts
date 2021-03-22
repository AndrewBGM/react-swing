import parseOptions from 'minimist'
import type { ReactElement } from 'react'
import ReactReconciler from 'react-reconciler'
import WebSocket from 'ws'
import createHostConfig from './create-host-config'

const supportedOptions = ['host'] as const

export type RenderOptions = {
  [K in typeof supportedOptions[number]]: string
}

const noop = () => {}

export const render = (element: ReactElement, argv: string[] = []) => {
  const { host } = parseOptions<RenderOptions>(argv, {
    default: {
      host: 'ws://localhost:8080/ws',
    },
  })

  const ws = new WebSocket(host)
  const hostConfig = createHostConfig(ws)

  const ReactSwing = ReactReconciler(hostConfig)
  const rootContainer = ReactSwing.createContainer(0, 0, false, null)
  ReactSwing.updateContainer(element, rootContainer, null, noop)
}

export * from './components'
