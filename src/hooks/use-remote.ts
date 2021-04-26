import { useContext } from 'react'
import { ReactSwingContext } from '../context'
import Remote from '../remote'

const useRemote = (): Remote => {
  const { remote } = useContext(ReactSwingContext)
  return remote
}

export default useRemote
