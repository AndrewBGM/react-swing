import { createElement, ReactNode } from 'react'

export interface JFrameProps {
  title: string

  children?: ReactNode
}

const JFrame = ({ children, ...props }: JFrameProps): JSX.Element =>
  createElement('JFrame', props, children)

export default JFrame
