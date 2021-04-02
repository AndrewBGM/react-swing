import React, { useEffect, useRef } from 'react'
import { JFrame, JLabel, JPanel, render } from '../dist'

const App = () => {
  const frame = useRef()

  useEffect(() => {
    console.log('Frame:', frame)
  }, [frame, frame.current])

  return (
    <JFrame ref={frame} title='Hello World'>
      <JPanel>
        <JLabel>Hello World!</JLabel>
      </JPanel>
    </JFrame>
  )
}

render(<App />)
