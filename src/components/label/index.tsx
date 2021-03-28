import { createElement, ReactNode } from 'react'

export interface LabelProps {
  children?: ReactNode
}

const Label = ({ children, ...props }: LabelProps): JSX.Element =>
  createElement('label', props, children)

export default Label
