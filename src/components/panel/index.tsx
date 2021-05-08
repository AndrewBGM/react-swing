import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export interface PanelProps {
  children?: ReactNode
}

const Panel = ({ children, ...props }: PanelProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent type='PANEL' {...props}>
    {children}
  </RemoteComponent>
)

export default Panel
