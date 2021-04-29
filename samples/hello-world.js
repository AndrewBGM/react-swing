// @ts-check
import React from 'react'
import { JFrame, JLabel, JPanel, render, useRemote } from '../'

const App = () => {
  const remote = useRemote()

  return (
    <JFrame title='Hello World!'>
      <JPanel>
        <JLabel>Host: {remote.host}</JLabel>
      </JPanel>
    </JFrame>
  )
}

render(<App />, 'ws://localhost:8080/')
  .then(() => console.log('Application ready'))
  .catch(e => console.error(e))
