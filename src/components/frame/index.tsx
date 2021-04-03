import { createElement, forwardRef, ReactNode } from 'react'

export type JFrameCloseHandler = () => void

export type JFrameHost = number

export interface JFrameProps {
  title?: string

  onClose?: JFrameCloseHandler

  children?: ReactNode
}

const JFrame = forwardRef<JFrameHost, JFrameProps>(
  ({ children, ...props }, ref) =>
    createElement('JFrame', { ...props, ref }, children),
)

export default JFrame
