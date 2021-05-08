import { createContext } from 'react'
import Remote from './remote'

export interface ReactSwingContextValue {
  remote: Remote
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ReactSwingContext = createContext<ReactSwingContextValue>(null!)

export default ReactSwingContext
