export const isArray = (x: unknown): x is unknown[] => Array.isArray(x)

export const isFunction = (x: unknown): x is CallableFunction =>
  typeof x === 'function'

export const isObject = (x: unknown): x is Record<string, unknown> =>
  Object.prototype.toString.call(x) === '[object Object]'

export const shallowDiff = (
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>,
): Record<string, unknown> => {
  const diff: Record<string, unknown> = {}
  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)])

  keys.forEach(key => {
    const a = obj1[key]
    const b = obj2[key]

    if (b !== a) {
      diff[key] = b
    }
  })

  return diff
}

export const withoutChildren = <T extends Record<string, unknown>>(
  obj: T,
): Omit<T, 'children'> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, ...rest } = obj
  return rest
}
