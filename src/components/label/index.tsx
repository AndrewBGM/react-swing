import { createElement, forwardRef, ReactNode } from 'react'

export interface JLabelProps {
  children?: ReactNode
}

const JLabel = forwardRef<number, JLabelProps>(({ children, ...props }, ref) =>
  createElement('JLabel', { ...props, ref }, children),
)

export default JLabel
