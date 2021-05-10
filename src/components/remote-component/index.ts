import { createElement, ReactNode } from 'react'

export interface RemoteComponentProps {
  type: string

  children?: ReactNode
}

const RemoteComponent = ({
  type,
  children,
  ...props
}: RemoteComponentProps): JSX.Element => createElement(type, props, children)

export default RemoteComponent
