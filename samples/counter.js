import React, { useCallback, useState } from 'react'
import { JButton, JFrame, JPanel, startApplication } from '../dist'

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

startApplication(<Counter />).catch(err => console.error(err))
