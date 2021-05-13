import React, { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export type JRadioButtonChangeHandler = (value: boolean) => void

export interface JRadioButtonProps {
  value: string

  children?: ReactNode
}

const JRadioButton = ({
  children,
  ...props
}: JRadioButtonProps): JSX.Element => {
  const text = React.Children.toArray(children).join('')

  const attrs = {
    text,
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <RemoteComponent type='JRadioButton' {...props} {...attrs} />
  )
}

export default JRadioButton
