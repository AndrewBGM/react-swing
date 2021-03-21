import { createElement, ReactNode } from 'react'

export interface ButtonProps {
  children: ReactNode
}

const Button = ({ children, ...props }: ButtonProps): JSX.Element =>
  createElement('button', props, children)

export default Button
