import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export interface JMenuBarProps {
  children?: ReactNode
}

const JMenuBar = ({ children, ...props }: JMenuBarProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent type='JMenuBar' {...props}>
    {children}
  </RemoteComponent>
)

export default JMenuBar
