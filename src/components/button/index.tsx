import { forwardRef, ReactNode } from 'react'
import { HostPublicInstance } from '../../create-host-config'
import RemoteComponent from '../remote-component'

export type JButtonActionHandler = () => void

export interface JButtonProps {
  onAction?: JButtonActionHandler

  children?: ReactNode
}

const JButton = forwardRef<HostPublicInstance, JButtonProps>(
  ({ children, ...props }, ref) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <RemoteComponent ref={ref} type='JButton' {...props}>
      {children}
    </RemoteComponent>
  ),
)

export default JButton
