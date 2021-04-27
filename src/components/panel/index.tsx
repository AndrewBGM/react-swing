import { forwardRef, ReactNode } from 'react'
import { HostPublicInstance } from '../../create-host-config'
import RemoteComponent from '../remote-component'

export interface JPanelProps {
  children?: ReactNode
}

const JPanel = forwardRef<HostPublicInstance, JPanelProps>(
  ({ children, ...props }, ref) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <RemoteComponent ref={ref} type='JPanel' {...props}>
      {children}
    </RemoteComponent>
  ),
)

export default JPanel
