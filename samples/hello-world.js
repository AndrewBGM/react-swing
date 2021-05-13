// @ts-check
import React from 'react'
import {
  JButton,
  JFrame,
  JMenu,
  JMenuBar,
  JMenuItem,
  JSplitPane,
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
          <JMenuBar>
            <JMenu text='File'>
              <JMenuItem>New</JMenuItem>
              <JMenuItem>Open</JMenuItem>
              <JMenuItem>Save</JMenuItem>
              <JMenuItem>Save As</JMenuItem>
              <JMenuItem onAction={handleClose}>Exit</JMenuItem>
            </JMenu>
            <JMenu text='Edit'>
              <JMenuItem>Undo</JMenuItem>
              <JMenuItem>Redo</JMenuItem>
            </JMenu>
          </JMenuBar>
          <JSplitPane orientation='HORIZONTAL'>
            <JButton>LEFT</JButton>

            <JButton>RIGHT</JButton>
          </JSplitPane>
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
