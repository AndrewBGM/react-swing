// @ts-check
import React, { useCallback, useRef, useState } from 'react'
import { JButton, JFrame, JLabel, JPanel, render } from '../'

const Counter = () => {
  const button = useRef()

  const [count, setCount] = useState(0)

  const handleClick = useCallback(() => {
    setCount(x => x + 1)
  }, [])

  return (
    <JButton ref={button} onAction={handleClick}>
      Count: {count}
    </JButton>
  )
}

const App = () => {
  const frame = useRef()
  const panel = useRef()
  const label = useRef()

  const [isFrameVisible, setFrameVisible] = useState(true)

  const handleClose = useCallback(() => {
    setFrameVisible(false)
  }, [])

  return (
    <>
      {isFrameVisible && (
        <JFrame ref={frame} title='Counter' onClose={handleClose}>
          <JPanel ref={panel}>
            <JLabel ref={label}>Hello World!</JLabel>
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
