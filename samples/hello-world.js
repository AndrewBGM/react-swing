// @ts-check
import React from 'react'
import { Frame, Label, Panel, startApplication, useRemote } from '../'

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

const App = () => {
  const remote = useRemote()
  const [isFrameOpen, setFrameOpen] = React.useState(true)
  const [selectedValue, setSelectedValue] = React.useState('one')

  React.useEffect(() => {
    if (isFrameOpen) {
      return
    }

    remote.close()
  }, [remote, isFrameOpen])

  const handleClose = React.useCallback(() => {
    setFrameOpen(false)
  }, [])

  return (
    <>
      {isFrameOpen && (
        <Frame title='Sample App' onClose={handleClose}>
          <Panel>
            <Label>Hello World!</Label>
          </Panel>
        </Frame>
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
