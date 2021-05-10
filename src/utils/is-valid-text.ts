const isValidText = (x: unknown): x is string | number =>
  typeof x === 'string' || typeof x === 'number'

export default isValidText
