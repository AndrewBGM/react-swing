import { ReactNode } from 'react'
import ReactReconciler from 'react-reconciler'
import { NIL } from 'uuid'
import { withProvider } from './context'
import { createBridge, createHostConfig } from './helpers'

export const startApplication = async (
  element: ReactNode,
  host: string,
): Promise<void> => {
  const bridge = await createBridge(host)
  const hostConfig = createHostConfig(bridge)
  const renderer = ReactReconciler(hostConfig)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const rootContainer = renderer.createContainer(NIL, 0, false, null)

  return new Promise((resolve, reject) => {
    try {
      renderer.updateContainer(
        withProvider(bridge, element),
        rootContainer,
        null,
        resolve,
      )
    } catch (err) {
      reject(err)
    }
  })
}

export * from './components'
export * from './hooks'
