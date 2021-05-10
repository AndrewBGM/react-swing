import { ReactNode } from 'react'
import RemoteComponent from '../remote-component'

export type JButtonActionHandler = () => void

export interface JButtonProps {
  onAction?: JButtonActionHandler

  children?: ReactNode
}

const JButton = ({ children, ...props }: JButtonProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent type='JButton' {...props}>
    {children}
  </RemoteComponent>
)

export default JButton
