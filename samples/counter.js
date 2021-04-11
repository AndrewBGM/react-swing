// @ts-check
import React, { useCallback, useState } from 'react'
import { JButton, JFrame, JPanel, render } from '../dist'

const Counter = () => {
  const [count, setCount] = useState(0)

  const handleClick = useCallback(() => {
    setCount(x => x + 1)
  }, [])

  return (
    <JFrame title='Counter'>
      <JPanel>
        <JButton onAction={handleClick}>Clicks: {count}</JButton>
      </JPanel>
    </JFrame>
  )
}

render(<Counter />, 'ws://localhost:8080/')
  .then(() => console.log('Application ready'))
  .catch(e => console.error(e))
