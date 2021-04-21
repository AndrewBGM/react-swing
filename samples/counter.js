// @ts-check
import React, { useCallback, useState } from 'react'
import { JButton, JFrame, JPanel, render } from '../'

const Counter = () => {
  const [count, setCount] = useState(0)

  const handleClick = useCallback(() => {
    setCount(x => x + 1)
  }, [])

  return <JButton onAction={handleClick}>Clicks: {count}</JButton>
}

const App = () => {
  const [isFrameVisible, setFrameVisible] = useState(true)

  const handleClose = useCallback(() => {
    setFrameVisible(false)
  }, [])

  return (
    <>
      {isFrameVisible && (
        <JFrame title='Counter' onClose={handleClose}>
          <JPanel>
            <Counter />
          </JPanel>
        </JFrame>
      )}
    </>
  )
}

render(<App />, 'ws://localhost:8080/')
  .then(() => console.log('Application ready'))
  .catch(e => console.error(e))
