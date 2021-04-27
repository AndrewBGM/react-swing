import { forwardRef, ReactNode } from 'react'
import { HostPublicInstance } from '../../create-host-config'
import RemoteComponent from '../remote-component'

export type JFrameCloseHandler = () => void

export interface JFrameProps {
  title?: string

  onClose?: JFrameCloseHandler

  children?: ReactNode
}

const JFrame = forwardRef<HostPublicInstance, JFrameProps>(
  ({ children, ...props }, ref) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <RemoteComponent ref={ref} type='JFrame' {...props}>
      {children}
    </RemoteComponent>
  ),
)

export default JFrame
