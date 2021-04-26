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

const buildValue = (host: string): ReactSwingContextValue => ({
  remote: buildRemote(host),
})

export const ReactSwingProvider = ({
  host,
  children,
}: ReactSwingProviderProps): JSX.Element => {
  const value = useMemo(() => buildValue(host), [host])

  return (
    <ReactSwingContext.Provider value={value}>
      {children}
    </ReactSwingContext.Provider>
  )
}
