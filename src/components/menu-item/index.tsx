import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export type JMenuItemActionHandler = () => void

export interface JMenuItemProps {
  onAction?: JMenuItemActionHandler

  children?: ReactNode
}

const JMenuItem = ({ children, ...props }: JMenuItemProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent type='JMenuItem' {...props}>
    {children}
  </RemoteComponent>
)

export default JMenuItem
