import { createElement, forwardRef, ReactNode } from 'react'

export type JFrameHost = number

export interface JFrameProps {
  title: string

  children?: ReactNode
}

const JFrame = forwardRef<JFrameHost, JFrameProps>(
  ({ children, ...props }, ref) =>
    createElement('JFrame', { ...props, ref }, children),
)

export default JFrame
