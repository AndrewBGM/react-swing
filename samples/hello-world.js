import React from 'react'
import { JFrame, JLabel, JPanel, render } from '../dist'

const App = () => {
  return (
    <JFrame title='Hello World'>
      <JPanel>
        <JLabel>Hello World!</JLabel>
      </JPanel>
    </JFrame>
  )
}

render(<App />)
