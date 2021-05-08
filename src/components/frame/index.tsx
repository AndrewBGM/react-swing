import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export type FrameCloseHandler = () => void

export interface FrameProps {
  title?: string

  onClose?: FrameCloseHandler

  children?: ReactNode
}

const Frame = ({ children, ...props }: FrameProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent type='FRAME' {...props}>
    {children}
  </RemoteComponent>
)

export default Frame
