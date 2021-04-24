import { createElement, forwardRef, ReactNode } from 'react'
import { HostInstance } from '../../create-host-config'

export type JButtonActionHandler = () => void

export interface JButtonProps {
  onAction?: JButtonActionHandler

  children?: ReactNode
}

const JButton = forwardRef<HostInstance, JButtonProps>(
  ({ children, ...props }, ref) =>
    createElement('JButton', { ...props, ref }, children),
)

export default JButton
