import RemoteComponent from '../remote-component'

export type TextFieldChangeHandler = (value: string) => void

export interface TextFieldProps {
  defaultValue?: string

  onChange?: TextFieldChangeHandler
}

const TextField = (props: TextFieldProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RemoteComponent type='TEXT_FIELD' {...props} />
)

export default TextField
