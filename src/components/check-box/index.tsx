import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export type JCheckBoxChangeHandler = (value: boolean) => void

export interface JCheckBoxProps {
  initialValue?: boolean

  onChange?: JCheckBoxChangeHandler

  children?: ReactNode
}

const JCheckBox = ({ children, ...props }: JCheckBoxProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent tag='JCheckBox' {...props}>
    {children}
  </RemoteComponent>
)

export default JCheckBox
