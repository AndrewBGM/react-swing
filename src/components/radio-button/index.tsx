import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export type JRadioButtonChangeHandler = (value: boolean) => void

export interface JRadioButtonProps {
  initialValue?: boolean

  onChange?: JRadioButtonChangeHandler

  children?: ReactNode
}

const JRadioButton = ({
  children,
  ...props
}: JRadioButtonProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent tag='JRadioButton' {...props}>
    {children}
  </RemoteComponent>
)

export default JRadioButton
