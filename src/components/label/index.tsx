import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export interface JLabelProps {
  children?: ReactNode
}

const JLabel = ({ children, ...props }: JLabelProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent tag='JLabel' {...props}>
    {children}
  </RemoteComponent>
)

export default JLabel
