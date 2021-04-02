import { createElement, forwardRef, ReactNode } from 'react'

export type JPanelHost = number

export interface JPanelProps {
  children?: ReactNode
}

const JPanel = forwardRef<JPanelHost, JPanelProps>(
  ({ children, ...props }, ref) =>
    createElement('JPanel', { ...props, ref }, children),
)

export default JPanel
