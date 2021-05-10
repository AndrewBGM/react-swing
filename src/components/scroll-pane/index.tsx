import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export interface JScrollPaneProps {
  children?: ReactNode
}

const JScrollPane = ({ children, ...props }: JScrollPaneProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent type='JScrollPane' {...props}>
    {children}
  </RemoteComponent>
)

export default JScrollPane
