export const shallowDiff = (
  a: Record<string, unknown>,
  b: Record<string, unknown>,
): Record<string, unknown> => {
  const diff: Record<string, unknown> = {}
  const keys = new Set([...Object.keys(a), ...Object.keys(b)])

  keys.forEach(key => {
    const left = a[key]
    const right = b[key]

    if (right !== left) {
      diff[key] = right
    }
  })

  return diff
}

export const withoutChildren = <T extends Record<string, unknown>>(
  props: T,
): Omit<T, 'children'> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, ...rest } = props
  return rest
}
