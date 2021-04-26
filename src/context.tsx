import { createContext, ReactNode, useMemo } from 'react'
import Bridge from './bridge'
import Remote, { buildRemote } from './remote'

export interface ReactSwingContextValue {
  remote: Remote
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ReactSwingContext = createContext<ReactSwingContextValue>(null!)

export interface ReactSwingProviderProps {
  host: string
  bridge: Bridge

  children?: ReactNode
}

const buildValue = (host: string, bridge: Bridge): ReactSwingContextValue => ({
  remote: buildRemote(host, bridge),
})

export const ReactSwingProvider = ({
  host,
  bridge,
  children,
}: ReactSwingProviderProps): JSX.Element => {
  const value = useMemo(() => buildValue(host, bridge), [host, bridge])

  return (
    <ReactSwingContext.Provider value={value}>
      {children}
    </ReactSwingContext.Provider>
  )
}
