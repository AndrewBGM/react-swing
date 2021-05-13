import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export interface JPanelProps {
  children?: ReactNode
}

const JPanel = ({ children, ...props }: JPanelProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent type='JPANEL' {...props}>
    {children}
  </RemoteComponent>
)

export default JPanel
