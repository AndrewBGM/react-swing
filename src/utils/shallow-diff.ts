const shallowDiff = (
  oldProps: Record<string, unknown>,
  newProps: Record<string, unknown>,
): Record<string, unknown> => {
  const diff: Record<string, unknown> = {}
  const keys = new Set([...Object.keys(oldProps), ...Object.keys(newProps)])

  keys.forEach(key => {
    const newValue = newProps[key]
    if (newValue !== oldProps[key]) {
      diff[key] = newValue
    }
  })

  return diff
}

export default shallowDiff
