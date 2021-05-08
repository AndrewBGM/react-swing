import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export interface LabelProps {
  children?: ReactNode
}

const Label = ({ children, ...props }: LabelProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent type='LABEL' {...props}>
    {children}
  </RemoteComponent>
)

export default Label
