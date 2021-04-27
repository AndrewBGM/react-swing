import Instance from './instance'

export { default as HostInstance } from './host-instance'
export { default as Instance } from './instance'
export { default as TextInstance } from './text-instance'

type InstanceIds<T extends Instance[]> = {
  [K in keyof T]: number
}

export const getInstanceIds = <T extends Instance[]>(
  ...instances: T
): InstanceIds<T> => instances.map(x => x.id) as InstanceIds<T>
