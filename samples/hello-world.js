// @ts-check
import React from 'react'
import { JButton, JFrame, JPanel, startApplication, useRemote } from '../'

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
  const [count, setCount] = React.useState(0)

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

  const handleClick = React.useCallback(() => {
    setCount(x => x + 1)
  }, [])

  return (
    <>
      {isFrameOpen && (
        <JFrame title='Sample App' onClose={handleClose}>
          <JPanel>
            <JButton onAction={handleClick}>Count: {count}</JButton>
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
