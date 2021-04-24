import { createElement, forwardRef, ReactNode } from 'react'
import { HostInstance } from '../../create-host-config'

export interface JPanelProps {
  children?: ReactNode
}

const JPanel = forwardRef<HostInstance, JPanelProps>(
  ({ children, ...props }, ref) =>
    createElement('JPanel', { ...props, ref }, children),
)

export default JPanel
