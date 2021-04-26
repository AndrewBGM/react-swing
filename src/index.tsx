import { ReactNode } from 'react'
import ReactReconciler from 'react-reconciler'
import { configureBridge } from './bridge'
import { ReactSwingProvider } from './context'
import createHostConfig from './create-host-config'

export const render = async (
  element: ReactNode,
  host: string,
): Promise<void> => {
  const bridge = await configureBridge(host)

  return new Promise((resolve, reject) => {
    try {
      const hostConfig = createHostConfig(bridge)
      const ReactSwing = ReactReconciler(hostConfig)

      const handleReady = () => {
        resolve()
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const root = ReactSwing.createContainer(0, 0, false, null)
      ReactSwing.updateContainer(
        <ReactSwingProvider host={host} bridge={bridge}>
          {element}
        </ReactSwingProvider>,
        root,
        null,
        handleReady,
      )
    } catch (err) {
      reject(err)
    }
  })
}

export * from './components'
export * from './hooks'
