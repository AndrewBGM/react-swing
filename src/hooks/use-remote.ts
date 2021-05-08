import { useContext } from 'react'
import { ReactSwingContext, Remote } from '../context'

export type { Remote }

const useRemote = (): Remote => {
  const { remote } = useContext(ReactSwingContext)
  return remote
}

export default useRemote
