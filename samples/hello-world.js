// @ts-check
import React from 'react'
import {
  Button,
  Frame,
  Label,
  Menu,
  MenuBar,
  MenuItem,
  Panel,
  startApplication,
  TextField,
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

const PrimaryFrame = ({
  isOpen,
  isSecondaryFrameOpen,
  onClose,
  onSecondaryFrameToggle,
}) => {
  const labelPrefix = isSecondaryFrameOpen ? 'Close' : 'Open'

  return (
    <>
      {isOpen && (
        <Frame title='Primary Frame' onClose={onClose}>
          <MenuBar>
            <Menu text='File'>
              <MenuItem>New</MenuItem>
              <MenuItem>Open</MenuItem>
              <MenuItem>Save</MenuItem>
              <MenuItem>Save As</MenuItem>
              <MenuItem onAction={onClose}>Exit</MenuItem>
            </Menu>
            <Menu text='Help'>
              <MenuItem>About</MenuItem>
            </Menu>
          </MenuBar>
          <Panel>
            <Button onAction={onSecondaryFrameToggle}>
              {labelPrefix} secondary frame
            </Button>
          </Panel>
        </Frame>
      )}
    </>
  )
}

const SecondaryFrame = ({ isOpen, onClose }) => {
  const [value, setValue] = React.useState('World')

  return (
    <>
      {isOpen && (
        <Frame title='Secondary Frame' onClose={onClose}>
          <Panel>
            <TextField defaultValue={value} onChange={setValue} />
            <Label>Hello {value}!</Label>
          </Panel>
        </Frame>
      )}
    </>
  )
}

const App = () => {
  const remote = useRemote()
  const [isPrimaryFrameOpen, setPrimaryFrameOpen] = React.useState(true)
  const [isSecondaryFrameOpen, setSecondaryFrameOpen] = React.useState(false)

  React.useEffect(() => {
    if (isPrimaryFrameOpen) {
      return
    }

    const id = setTimeout(() => {
      remote.close()
    }, 250)

    return () => clearTimeout(id)
  }, [remote, isPrimaryFrameOpen])

  const handlePrimaryFrameClose = React.useCallback(() => {
    setPrimaryFrameOpen(false)
    setSecondaryFrameOpen(false)
  }, [])

  const handleSecondaryFrameClose = React.useCallback(() => {
    setSecondaryFrameOpen(false)
  }, [])

  const handleSecondaryFrameToggle = React.useCallback(() => {
    setSecondaryFrameOpen(x => !x)
  }, [])

  return (
    <>
      <PrimaryFrame
        isOpen={isPrimaryFrameOpen}
        isSecondaryFrameOpen={isSecondaryFrameOpen}
        onClose={handlePrimaryFrameClose}
        onSecondaryFrameToggle={handleSecondaryFrameToggle}
      />
      <SecondaryFrame
        isOpen={isSecondaryFrameOpen}
        onClose={handleSecondaryFrameClose}
      />
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
