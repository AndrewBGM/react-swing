import { createElement, forwardRef, ReactNode } from 'react'
import { HostInstance } from '../../create-host-config'

export type JFrameCloseHandler = () => void

export interface JFrameProps {
  title?: string

  onClose?: JFrameCloseHandler

  children?: ReactNode
}

const JFrame = forwardRef<HostInstance, JFrameProps>(
  ({ children, ...props }, ref) =>
    createElement('JFrame', { ...props, ref }, children),
)

export default JFrame
