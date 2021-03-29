import { createElement, forwardRef, ReactNode } from 'react'

export interface JFrameProps {
  title: string

  children?: ReactNode
}

const JFrame = forwardRef<number, JFrameProps>(({ children, ...props }, ref) =>
  createElement('JFrame', { ...props, ref }, children)
)

export default JFrame
