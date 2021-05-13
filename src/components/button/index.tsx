import React, { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export type JButtonActionHandler = () => void

export interface JButtonProps {
  onAction?: JButtonActionHandler

  children?: ReactNode
}

const JButton = ({ children, ...props }: JButtonProps): JSX.Element => {
  const text = React.Children.toArray(children).join('')

  const attrs = {
    text,
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <RemoteComponent type='JBUTTON' {...props} {...attrs} />
  )
}

export default JButton
