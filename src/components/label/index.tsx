import React, { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export interface JLabelProps {
  children?: ReactNode
}

const JLabel = ({ children, ...props }: JLabelProps): JSX.Element => {
  const text = React.Children.toArray(children).join('')

  const attrs = {
    text,
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <RemoteComponent type='JLABEL' {...props} {...attrs} />
  )
}

export default JLabel
