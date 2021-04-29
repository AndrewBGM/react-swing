import { createContext, ReactNode, useContext, useMemo } from 'react'
import { Client } from './client'
import { configureRemote, Remote } from './remote'

export interface ReactSwingContextValue {
  remote: Remote
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ReactSwingContext = createContext<ReactSwingContextValue>(null!)

export interface ReactSwingProviderProps {
  client: Client

  children: ReactNode
}

const configureValue = (client: Client): ReactSwingContextValue => ({
  remote: configureRemote(client),
})

export const ReactSwingProvider = ({
  client,
  children,
}: ReactSwingProviderProps): JSX.Element => {
  const value = useMemo(() => configureValue(client), [client])

  return (
    <ReactSwingContext.Provider value={value}>
      {children}
    </ReactSwingContext.Provider>
  )
}

export const useReactSwing = (): ReactSwingContextValue =>
  useContext(ReactSwingContext)
