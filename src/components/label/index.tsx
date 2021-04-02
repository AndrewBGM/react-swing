import { createElement, forwardRef, ReactNode } from 'react'

export type JLabelHost = number

export interface JLabelProps {
  children?: ReactNode
}

const JLabel = forwardRef<JLabelHost, JLabelProps>(
  ({ children, ...props }, ref) =>
    createElement('JLabel', { ...props, ref }, children),
)

export default JLabel
