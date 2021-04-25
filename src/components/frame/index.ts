import { createElement, ReactNode } from 'react'

export type JFrameCloseHandler = () => void

export interface JFrameProps {
  title?: string

  onClose?: JFrameCloseHandler

  children?: ReactNode
}

const JFrame = ({ children, ...props }: JFrameProps): JSX.Element =>
  createElement('JFrame', props, children)

export default JFrame
