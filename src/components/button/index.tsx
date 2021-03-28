import { createElement, ReactNode } from 'react'

export type JButtonActionHandler = () => void

export interface JButtonProps {
  onAction?: JButtonActionHandler

  children?: ReactNode
}

const JButton = ({ children, ...props }: JButtonProps): JSX.Element =>
  createElement('JButton', props, children)

export default JButton
