import { forwardRef, ReactNode } from 'react'
import { HostPublicInstance } from '../../create-host-config'
import RemoteComponent from '../remote-component'

export interface JLabelProps {
  children?: ReactNode
}

const JLabel = forwardRef<HostPublicInstance, JLabelProps>(
  ({ children, ...props }, ref) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <RemoteComponent ref={ref} type='JLabel' {...props}>
      {children}
    </RemoteComponent>
  ),
)

export default JLabel
