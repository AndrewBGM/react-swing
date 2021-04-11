import { performance } from 'perf_hooks'
import { HostConfig, OpaqueHandle } from 'react-reconciler'
import Bridge, {
  BridgeContainer,
  BridgeInstance,
  BridgeProps,
  BridgeSuspenseInstance,
  BridgeTextInstance,
  BridgeType,
  BridgeUpdatePayload,
} from './bridge'

type HostContext = Record<string, unknown>
type HostHydratableInstance = number
type HostPublicInstance = number
type HostChildSet = unknown
type HostTimeoutHandle = NodeJS.Timeout
type HostNoTimeout = -1

const withoutChildren = (props: BridgeProps): Omit<BridgeProps, 'children'> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, ...rest } = props
  return rest
}

const createHostConfig = (
  bridge: Bridge,
): HostConfig<
  BridgeType,
  BridgeProps,
  BridgeContainer,
  BridgeInstance,
  BridgeTextInstance,
  BridgeSuspenseInstance,
  HostHydratableInstance,
  HostPublicInstance,
  HostContext,
  BridgeUpdatePayload,
  HostChildSet,
  HostTimeoutHandle,
  HostNoTimeout
> => ({
  isPrimaryRenderer: true,

  now: () => performance.now(),
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,
  queueMicrotask,

  createInstance(
    type: BridgeType,
    props: BridgeProps,
    _rootContainer: BridgeContainer,
    _hostContext: HostContext,
    _internalHandle: OpaqueHandle,
  ): BridgeInstance {
    return bridge.createInstance(type, withoutChildren(props))
  },

  createTextInstance(
    text: string,
    _rootContainer: BridgeContainer,
    _hostContext: HostContext,
    _internalHandle: OpaqueHandle,
  ): BridgeTextInstance {
    return bridge.createTextInstance(text)
  },

  appendInitialChild(
    parentInstance: BridgeInstance,
    child: BridgeInstance | BridgeTextInstance,
  ): void {
    bridge.appendInitialChild(parentInstance, child)
  },

  finalizeInitialChildren(
    _instance: BridgeInstance,
    _type: BridgeType,
    _props: BridgeProps,
    _rootContainer: BridgeContainer,
    _hostContext: HostContext,
  ): boolean {
    return false
  },

  prepareUpdate(
    _instance: BridgeInstance,
    _type: BridgeType,
    oldProps: BridgeProps,
    newProps: BridgeProps,
    _rootContainer: BridgeContainer,
    _hostContext: HostContext,
  ): BridgeUpdatePayload | null {
    const changedProps: Record<string, unknown> = {}
    const keys = new Set([...Object.keys(oldProps), ...Object.keys(newProps)])

    keys.forEach(key => {
      const oldValue = oldProps[key]
      const newValue = newProps[key]

      if (oldValue !== newValue) {
        changedProps[key] = newValue === undefined ? null : newValue
      }
    })

    const needsUpdate = Object.keys(changedProps).length > 0
    if (!needsUpdate) {
      return null
    }

    return {
      changedProps: withoutChildren(changedProps),
    }
  },

  shouldSetTextContent(_type: BridgeType, _props: BridgeProps): boolean {
    return false
  },

  getRootHostContext(
    _rootContainer: BridgeContainer,
  ): Record<string, unknown> | null {
    return null
  },

  getChildHostContext(
    parentHostContext: Record<string, unknown>,
    _type: BridgeType,
    _rootContainer: BridgeContainer,
  ): Record<string, unknown> {
    return parentHostContext
  },

  getPublicInstance(
    instance: BridgeInstance | BridgeTextInstance,
  ): HostPublicInstance {
    return instance
  },

  prepareForCommit(
    _containerInfo: BridgeContainer,
  ): Record<string, unknown> | null {
    return null
  },

  resetAfterCommit(_containerInfo: BridgeContainer): void {
    // noop
  },

  preparePortalMount(_containerInfo: BridgeContainer): void {
    // noop
  },

  supportsMutation: true,

  appendChild(
    parentInstance: BridgeInstance,
    child: BridgeInstance | BridgeTextInstance,
  ): void {
    bridge.appendChild(parentInstance, child)
  },

  appendChildToContainer(
    container: BridgeContainer,
    child: BridgeInstance | BridgeTextInstance,
  ): void {
    bridge.appendChildToContainer(container, child)
  },

  insertBefore(
    parentInstance: BridgeInstance,
    child: BridgeInstance | BridgeTextInstance,
    beforeChild: BridgeInstance | BridgeTextInstance | BridgeSuspenseInstance,
  ): void {
    bridge.insertBefore(parentInstance, child, beforeChild)
  },

  insertInContainerBefore(
    container: BridgeContainer,
    child: BridgeInstance | BridgeTextInstance,
    beforeChild: BridgeInstance | BridgeTextInstance | BridgeSuspenseInstance,
  ): void {
    bridge.insertInContainerBefore(container, child, beforeChild)
  },

  removeChild(
    parentInstance: BridgeInstance,
    child: BridgeInstance | BridgeTextInstance | BridgeSuspenseInstance,
  ): void {
    bridge.removeChild(parentInstance, child)
  },

  removeChildFromContainer(
    container: BridgeContainer,
    child: BridgeInstance | BridgeTextInstance | BridgeSuspenseInstance,
  ): void {
    bridge.removeChildFromContainer(container, child)
  },

  resetTextContent(_instance: BridgeInstance): void {
    throw new Error('Not implemented yet.')
  },

  commitTextUpdate(textInstance: BridgeTextInstance, newText: string): void {
    bridge.commitTextUpdate(textInstance, newText)
  },

  commitMount(
    _instance: BridgeInstance,
    _type: BridgeType,
    _props: BridgeProps,
    _internalInstanceHandle: OpaqueHandle,
  ): void {
    throw new Error('Not implemented yet.')
  },

  commitUpdate(
    instance: BridgeInstance,
    updatePayload: BridgeUpdatePayload,
    _type: BridgeType,
    _prevProps: BridgeProps,
    _nextProps: BridgeProps,
    _internalHandle: OpaqueHandle,
  ): void {
    bridge.commitUpdate(instance, updatePayload)
  },

  hideInstance(_instance: BridgeInstance): void {
    throw new Error('Not implemented yet.')
  },

  hideTextInstance(_textInstance: BridgeTextInstance): void {
    throw new Error('Not implemented yet.')
  },

  unhideInstance(_instance: BridgeInstance, _props: BridgeProps): void {
    throw new Error('Not implemented yet.')
  },

  unhideTextInstance(_textInstance: BridgeTextInstance, _text: string): void {
    throw new Error('Not implemented yet.')
  },

  clearContainer(container: BridgeContainer): void {
    bridge.clearContainer(container)
  },

  supportsHydration: false,

  supportsPersistence: false,
})

export default createHostConfig
