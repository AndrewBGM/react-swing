// @ts-check
import React from 'react'
import {
  Button,
  Frame,
  Menu,
  MenuBar,
  MenuItem,
  Panel,
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

const App = () => {
  const remote = useRemote()
  const [isFrameOpen, setFrameOpen] = React.useState(true)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (isFrameOpen) {
      return
    }

    const id = setTimeout(() => {
      remote.close()
    }, 250)

    return () => clearTimeout(id)
  }, [remote, isFrameOpen])

  const handleClick = React.useCallback(() => {
    setCount(x => x + 1)
  }, [])

  const handleClose = React.useCallback(() => {
    setFrameOpen(false)
  }, [])

  return (
    <>
      {isFrameOpen && (
        <Frame title='Sample App' onClose={handleClose}>
          <MenuBar>
            <Menu text='File'>
              <MenuItem>One</MenuItem>
              {count >= 5 && count < 10 && <MenuItem>HELLO</MenuItem>}
              <MenuItem>Two</MenuItem>
              <MenuItem>Three</MenuItem>
            </Menu>
            {count > 10 && (
              <Menu text='HELLO'>
                <MenuItem>One</MenuItem>
              </Menu>
            )}
            <Menu text='Help'>
              <MenuItem>One</MenuItem>
            </Menu>
          </MenuBar>
          <Panel>
            <Button onAction={handleClick}>Count: {count}</Button>
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
