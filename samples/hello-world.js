// @ts-check
import React from 'react'
import {
  ButtonGroup,
  JButton,
  JFrame,
  JLabel,
  JPanel,
  JRadioButton,
  JTextField,
  startApplication,
  useRemote,
} from '../'

class ErrorBoundary extends React.Component {
  state = { error: null }

  componentDidCatch(err) {
    console.error(err)
    this.setState({
      error: err,
    })
  }

  render() {
    const { err } = this.state
    if (err) {
      return null
    }

    return this.props.children
  }
}

const SizeSelector = () => {
  const [name, setName] = React.useState('Bob')
  const [size, setSize] = React.useState('small')

  const handleSubmit = React.useCallback(() => {
    console.log({
      name,
      size,
    })
  }, [name, size])

  return (
    <>
      <JLabel>
        Your name is {name} and you are {size}
      </JLabel>
      <JTextField value={name} onChange={setName} />
      <ButtonGroup selectedValue={size} onChange={setSize}>
        <JRadioButton value='small'>Small</JRadioButton>
        <JRadioButton value='medium'>Medium</JRadioButton>
        <JRadioButton value='large'>Large</JRadioButton>
      </ButtonGroup>
      <JButton onAction={handleSubmit}>Submit</JButton>
    </>
  )
}

const App = () => {
  const remote = useRemote()
  const [isFrameOpen, setFrameOpen] = React.useState(true)

  React.useEffect(() => {
    if (isFrameOpen) {
      return
    }

    const id = setTimeout(() => remote.close())
    return () => clearTimeout(id)
  }, [remote, isFrameOpen])

  const handleClose = React.useCallback(() => {
    setFrameOpen(false)
  }, [])

  return (
    <>
      {isFrameOpen && (
        <JFrame title='Sample App' onClose={handleClose}>
          <JPanel>
            <SizeSelector />
          </JPanel>
        </JFrame>
      )}
    </>
  )
}

startApplication(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  'ws://localhost:8080/',
)
  .then(() => console.log('Application ready'))
  .catch(e => console.error(e))
