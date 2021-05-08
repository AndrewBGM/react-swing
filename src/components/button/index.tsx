import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export type ButtonActionHandler = () => void

export interface ButtonProps {
  onAction?: ButtonActionHandler

  children?: ReactNode
}

const Button = ({ children, ...props }: ButtonProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent type='BUTTON' {...props}>
    {children}
  </RemoteComponent>
)

export default Button
