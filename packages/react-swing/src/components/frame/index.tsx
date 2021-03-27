import { createElement, ReactNode } from 'react'

export interface FrameProps {
  title: string

  children?: ReactNode
}

const Frame = ({ children, ...props }: FrameProps): JSX.Element =>
  createElement('frame', props, children)

export default Frame
