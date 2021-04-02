import { createElement, forwardRef, ReactNode } from 'react'

export type JButtonActionHandler = () => void

export type JButtonHost = number

export interface JButtonProps {
  onAction?: JButtonActionHandler

  children?: ReactNode
}

const JButton = forwardRef<JButtonHost, JButtonProps>(
  ({ children, ...props }, ref) =>
    createElement('JButton', { ...props, ref }, children),
)

export default JButton
