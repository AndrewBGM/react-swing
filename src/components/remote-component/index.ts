import { createElement, forwardRef, ReactNode } from 'react'
import { HostPublicInstance } from '../../create-host-config'

export interface RemoteComponentProps {
  type: string

  children?: ReactNode
}

const RemoteComponent = forwardRef<HostPublicInstance, RemoteComponentProps>(
  ({ type, children, ...props }, ref) =>
    createElement(type, { ...props, ref }, children),
)

export default RemoteComponent
