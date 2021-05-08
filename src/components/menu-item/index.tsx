import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export type MenuItemActionHandler = () => void

export interface MenuItemProps {
  onAction?: MenuItemActionHandler

  children?: ReactNode
}

const MenuItem = ({ children, ...props }: MenuItemProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent type='MENU_ITEM' {...props}>
    {children}
  </RemoteComponent>
)

export default MenuItem
