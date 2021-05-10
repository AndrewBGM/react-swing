import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export type RadioButtonChangeHandler = (value: boolean) => void

export interface RadioButtonProps {
  initialValue?: boolean

  onChange?: RadioButtonChangeHandler

  children?: ReactNode
}

const RadioButton = ({ children, ...props }: RadioButtonProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent type='RADIO_BUTTON' {...props}>
    {children}
  </RemoteComponent>
)

export default RadioButton
