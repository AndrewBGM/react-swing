// @ts-check
import React, { useCallback, useState } from 'react'
import { JButton, JFrame, JPanel, render } from '../'

const App = () => {
  const [clicks, setClicks] = useState(0)

  const handleClick = useCallback(() => {
    setClicks(x => x + 1)
  }, [])

  const handleClose = useCallback(() => {
    console.log('Closed')
  }, [])

  return (
    <JFrame title='Counter' onClose={handleClose}>
      <JPanel>
        <JButton onAction={handleClick}>Clicks: {clicks}</JButton>
      </JPanel>
    </JFrame>
  )
}

render(<App />, 'ws://localhost:8080/')
  .then(() => console.log('Application ready'))
  .catch(e => console.error(e))
