import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export type JMenuActionHandler = () => void

export interface JMenuProps {
  text?: string

  onAction?: JMenuActionHandler

  children?: ReactNode
}

const JMenu = ({ children, ...props }: JMenuProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent tag='JMenu' {...props}>
    {children}
  </RemoteComponent>
)

export default JMenu
