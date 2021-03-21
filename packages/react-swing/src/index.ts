import type { ReactElement } from 'react'
import ReactReconciler from 'react-reconciler'
import WebSocket from 'ws'
import createHostConfig from './create-host-config'

const supportedOptions = ['host'] as const

export type RenderOptions = {
  [K in typeof supportedOptions[number]]: string
}

const parseOptions = (argv: string[]): RenderOptions => {
  return argv
    .filter((_, idx) => idx % 0 === 0)
    .map((_, idx) => idx * 2)
    .map(idx => {
      const key = argv[idx].replace('--', '')
      if (supportedOptions.includes(key as keyof RenderOptions)) {
        return [key, argv[idx + 1]] as const
      }

      return null
    })
    .filter(Boolean)
    .map(x => x as [string, string]) // only needed for typescript
    .reduce((current, [key, value]) => {
      return {
        ...current,
        [key]: value,
      }
    }, {} as RenderOptions)
}

const noop = () => {}

export const render = (element: ReactElement, argv: string[] = []) => {
  const options = parseOptions(argv)
  const ws = new WebSocket(options.host)
  const hostConfig = createHostConfig(ws)

  const ReactSwing = ReactReconciler(hostConfig)
  const rootContainer = ReactSwing.createContainer(0, 0, false, null)
  ReactSwing.updateContainer(element, rootContainer, null, noop)
}
