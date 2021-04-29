import { createElement, ReactNode } from 'react'

export interface JPanelProps {
  children?: ReactNode
}

const JPanel = ({ children, ...props }: JPanelProps): JSX.Element =>
  createElement('JPanel', props, children)

export default JPanel
