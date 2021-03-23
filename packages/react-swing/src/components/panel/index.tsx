import { createElement, ReactNode } from 'react'

export interface PanelProps {
  children?: ReactNode
}

const Panel = ({ children, ...props }: PanelProps): JSX.Element =>
  createElement('panel', props, children)

export default Panel
