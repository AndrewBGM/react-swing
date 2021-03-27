import { createElement, ReactNode } from 'react'

export type ButtonActionHandler = () => void

export interface ButtonProps {
  onAction?: ButtonActionHandler

  children?: ReactNode
}

const Button = ({ children, ...props }: ButtonProps): JSX.Element =>
  createElement('button', props, children)

export default Button
