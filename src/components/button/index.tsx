import { createElement, forwardRef, ReactNode } from 'react'

export type JButtonActionHandler = () => void

export interface JButtonProps {
  onAction?: JButtonActionHandler

  children?: ReactNode
}

const JButton = forwardRef<number, JButtonProps>(
  ({ children, ...props }, ref) =>
    createElement('JButton', { ...props, ref }, children)
)

export default JButton
