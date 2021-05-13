import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export type JTextFieldChangeHandler = (value: string) => void

export interface JTextFieldProps {
  value?: string

  onChange?: JTextFieldChangeHandler

  children?: ReactNode
}

const JTextField = ({ children, ...props }: JTextFieldProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent type='JTextField' {...props}>
    {children}
  </RemoteComponent>
)

export default JTextField
