// @ts-check
import React, { useCallback, useState } from 'react'
import { JButton, JFrame, JLabel, JPanel, render, useRemote } from '../'

const Counter = () => {
  const [clicks, setClicks] = useState(0)

  const handleClick = useCallback(() => {
    setClicks(x => x + 1)
  }, [])

  return <JButton onAction={handleClick}>Clicks: {clicks}</JButton>
}

const App = () => {
  const remote = useRemote()

  return (
    <JFrame title='Counter'>
      <JPanel>
        <JLabel>Host: {remote.host}</JLabel>
        <Counter />
      </JPanel>
    </JFrame>
  )
}

render(<App />, 'ws://localhost:8080/')
  .then(() => console.log('Application ready'))
  .catch(e => console.error(e))
