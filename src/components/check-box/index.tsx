import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export type CheckBoxChangeHandler = (value: boolean) => void

export interface CheckBoxProps {
  initialValue?: boolean

  onChange?: CheckBoxChangeHandler

  children?: ReactNode
}

const CheckBox = ({ children, ...props }: CheckBoxProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent type='CHECK_BOX' {...props}>
    {children}
  </RemoteComponent>
)

export default CheckBox
