import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export interface MenuBarProps {
  children?: ReactNode
}

const MenuBar = ({ children, ...props }: MenuBarProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent type='MENU_BAR' {...props}>
    {children}
  </RemoteComponent>
)

export default MenuBar
