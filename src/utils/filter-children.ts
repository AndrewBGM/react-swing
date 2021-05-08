const filterChildren = (
  props: Record<string, unknown>,
): Record<string, unknown> => {
  const { children, ...rest } = props
  const filteredChildren = [children]
    .flat()
    .filter(x => typeof x === 'string' || typeof x === 'number')
    .join('')

  if (filteredChildren.length === 0) {
    return rest
  }

  return {
    ...rest,
    children: filteredChildren,
  }
}

export default filterChildren
