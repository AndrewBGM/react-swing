import { createElement, ReactNode } from 'react'

export interface JLabelProps {
  children?: ReactNode
}

const JLabel = ({ children, ...props }: JLabelProps): JSX.Element =>
  createElement('JLabel', props, children)

export default JLabel
