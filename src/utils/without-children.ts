const withoutChildren = <T extends Record<string, unknown>>(
  props: T,
): Omit<T, 'children'> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, ...rest } = props
  return rest
}

export default withoutChildren
