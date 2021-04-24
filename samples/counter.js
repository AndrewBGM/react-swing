// @ts-check
import React, { useCallback, useState } from 'react'
import { JButton, JFrame, JLabel, JPanel, render } from '../'

const Counter = () => {
  const [count, setCount] = useState(0)

  const handleClick = useCallback(() => {
    setCount(x => x + 1)
  }, [])

  return <JButton onAction={handleClick}>Count: {count}</JButton>
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
            <JLabel>Hello World!</JLabel>
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
