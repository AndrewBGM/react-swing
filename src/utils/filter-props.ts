import { Children, PropsWithChildren } from 'react'
import isValidText from './is-valid-text'

const filterProps = (
  props: PropsWithChildren<Record<string, unknown>>,
): Record<string, unknown> => {
  const { children, ...rest } = props
  const filteredChildren = Children.toArray(children)
    .filter(isValidText)
    .join('')

  if (filteredChildren.length === 0) {
    return rest
  }

  return {
    ...rest,
    children: filteredChildren,
  }
}

export default filterProps
