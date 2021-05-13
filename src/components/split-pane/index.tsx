import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export type JSplitPaneOrientation = 'HORIZONTAL' | 'VERTICAL'

export interface JSplitPaneProps {
  orientation?: JSplitPaneOrientation

  children?: ReactNode
}

const JSplitPane = ({ children, ...props }: JSplitPaneProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent type='JSPLIT_PANE' {...props}>
    {children}
  </RemoteComponent>
)

export default JSplitPane
