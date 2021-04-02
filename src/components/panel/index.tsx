import { createElement, forwardRef, ReactNode } from 'react'

export interface JPanelProps {
  children?: ReactNode
}

const JPanel = forwardRef<number, JPanelProps>(({ children, ...props }, ref) =>
  createElement('JPanel', { ...props, ref }, children),
)

export default JPanel
