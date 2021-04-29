class Instance {
  constructor(readonly id: number) {}
}

type InstanceIds<T extends Instance[]> = {
  [K in keyof T]: number
}

export const findInstanceIds = <T extends Instance[]>(
  ...instances: T
): InstanceIds<T> => instances.map(x => x.id) as InstanceIds<T>

export default Instance
