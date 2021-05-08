import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export type MenuActionHandler = () => void

export interface MenuProps {
  text?: string

  onAction?: MenuActionHandler

  children?: ReactNode
}

const Menu = ({ children, ...props }: MenuProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent type='MENU' {...props}>
    {children}
  </RemoteComponent>
)

export default Menu
