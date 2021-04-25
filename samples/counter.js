// @ts-check
import React, { useCallback, useState } from 'react'
import { JFrame, JLabel, JPanel, render } from '../'

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
          </JPanel>
        </JFrame>
      )}
    </>
  )
}

render(<App />, 'ws://localhost:8080/')
  .then(() => console.log('Application ready'))
  .catch(e => console.error(e))
