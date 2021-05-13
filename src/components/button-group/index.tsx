import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export type ButtonGroupChangeHandler = (value: string) => void

export interface ButtonGroupProps {
  selectedValue?: string

  onChange?: ButtonGroupChangeHandler

  children?: ReactNode
}

const ButtonGroup = ({ children, ...props }: ButtonGroupProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent type='ButtonGroup' {...props}>
    {children}
  </RemoteComponent>
)

export default ButtonGroup
