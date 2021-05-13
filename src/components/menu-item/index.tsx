import React, { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export type JMenuItemActionHandler = () => void

export interface JMenuItemProps {
  onAction?: JMenuItemActionHandler

  children?: ReactNode
}

const JMenuItem = ({ children, ...props }: JMenuItemProps): JSX.Element => {
  const text = React.Children.toArray(children).join('')

  const attrs = {
    text,
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <RemoteComponent type='JMENU_ITEM' {...props} {...attrs} />
  )
}

export default JMenuItem
