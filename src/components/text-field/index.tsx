import RemoteComponent from '../remote-component'

export type JTextFieldChangeHandler = (value: string) => void

export interface JTextFieldProps {
  initialValue?: string

  onChange?: JTextFieldChangeHandler
}

const JTextField = (props: JTextFieldProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent type='JTextField' {...props} />
)

export default JTextField
