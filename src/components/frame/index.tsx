import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export type JFrameCloseHandler = () => void

export interface JFrameProps {
  title?: string

  onClose?: JFrameCloseHandler

  children?: ReactNode
}

const JFrame = ({ children, ...props }: JFrameProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent type='JFRAME' {...props}>
    {children}
  </RemoteComponent>
)

export default JFrame
