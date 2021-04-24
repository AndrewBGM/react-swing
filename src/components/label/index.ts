import { createElement, forwardRef, ReactNode } from 'react'
import { HostInstance } from '../../create-host-config'

export interface JLabelProps {
  children?: ReactNode
}

const JLabel = forwardRef<HostInstance, JLabelProps>(
  ({ children, ...props }, ref) =>
    createElement('JLabel', { ...props, ref }, children),
)

export default JLabel
