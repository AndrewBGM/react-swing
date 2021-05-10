import { createElement, ReactNode } from 'react'

export interface RemoteComponentProps {
  tag: string

  children?: ReactNode
}

const RemoteComponent = ({
  tag,
  children,
  ...props
}: RemoteComponentProps): JSX.Element => createElement(tag, props, children)

export default RemoteComponent
