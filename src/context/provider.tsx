import { ReactNode, useMemo } from 'react'
import { Bridge } from '../bridge'
import ReactSwingContext, { ReactSwingContextValue } from './context'
import { buildRemote } from './remote'

export interface ReactSwingProviderProps {
  bridge: Bridge

  children: ReactNode
}

const buildValue = (bridge: Bridge): ReactSwingContextValue => ({
  remote: buildRemote(bridge),
})

const ReactSwingProvider = ({
  bridge,
  children,
}: ReactSwingProviderProps): JSX.Element => {
  const value = useMemo(() => buildValue(bridge), [bridge])

  return (
    <ReactSwingContext.Provider value={value}>
      {children}
    </ReactSwingContext.Provider>
  )
}

export const withProvider = (
  bridge: Bridge,
  element: ReactNode,
): JSX.Element => (
  <ReactSwingProvider bridge={bridge}>{element}</ReactSwingProvider>
)

export default ReactSwingProvider
