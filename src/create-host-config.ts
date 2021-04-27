import { performance } from 'perf_hooks'
import { HostConfig, OpaqueHandle } from 'react-reconciler'
import Bridge, {
  BridgeContainer,
  BridgeInstance,
  BridgeProps,
  BridgeType,
  BridgeUpdatePayload,
} from './bridge'

export type HostType = BridgeType
export type HostProps = BridgeProps
export type HostContainer = BridgeContainer
export type HostInstance = BridgeInstance
export type HostTextInstance = BridgeInstance
export type HostSuspenseInstance = BridgeInstance
export type HostHydratableInstance = BridgeInstance
export type HostPublicInstance = number
export type HostContext = Record<string, unknown>
export type HostUpdatePayload = BridgeUpdatePayload
export type HostChildSet = unknown
export type HostTimeoutHandle = NodeJS.Timeout
export type HostNoTimeout = -1

const createHostConfig = (
  bridge: Bridge,
): HostConfig<
  HostType,
  HostProps,
  HostContainer,
  HostInstance,
  HostTextInstance,
  HostSuspenseInstance,
  HostHydratableInstance,
  HostPublicInstance,
  HostContext,
  HostUpdatePayload,
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
    type: HostType,
    props: HostProps,
    _rootContainer: HostContainer,
    _hostContext: HostContext,
    _internalHandle: OpaqueHandle,
  ): HostInstance {
    return bridge.createInstance(type, props)
  },

  createTextInstance(
    text: string,
    _rootContainer: HostContainer,
    _hostContext: HostContext,
    _internalHandle: OpaqueHandle,
  ): HostTextInstance {
    return bridge.createTextInstance(text)
  },

  appendInitialChild(
    parentInstance: HostInstance,
    child: HostInstance | HostTextInstance,
  ): void {
    bridge.appendInitialChild(parentInstance, child)
  },

  finalizeInitialChildren(
    _instance: HostInstance,
    _type: HostType,
    _props: HostProps,
    _rootContainer: HostContainer,
    _hostContext: HostContext,
  ): boolean {
    return false
  },

  prepareUpdate(
    instance: HostInstance,
    _type: HostType,
    oldProps: HostProps,
    newProps: HostProps,
    _rootContainer: HostContainer,
    _hostContext: HostContext,
  ): HostUpdatePayload | null {
    return bridge.prepareUpdate(instance, oldProps, newProps)
  },

  shouldSetTextContent(_type: HostType, _props: HostProps): boolean {
    return false
  },

  getRootHostContext(_rootContainer: HostContainer): HostContext | null {
    return null
  },

  getChildHostContext(
    parentHostContext: HostContext,
    _type: HostType,
    _rootContainer: HostContainer,
  ): HostContext {
    return parentHostContext
  },

  getPublicInstance(
    instance: HostInstance | HostTextInstance,
  ): HostPublicInstance {
    return instance.id
  },

  prepareForCommit(
    _containerInfo: HostContainer,
  ): Record<string, unknown> | null {
    return null
  },

  resetAfterCommit(_containerInfo: HostContainer): void {
    // noop
  },

  preparePortalMount(_containerInfo: HostContainer): void {
    // noop
  },

  supportsMutation: true,

  appendChild(
    parentInstance: HostInstance,
    child: HostInstance | HostTextInstance,
  ): void {
    bridge.appendChild(parentInstance, child)
  },

  appendChildToContainer(
    container: HostContainer,
    child: HostInstance | HostTextInstance,
  ): void {
    bridge.appendChildToContainer(container, child)
  },

  insertBefore(
    parentInstance: HostInstance,
    child: HostInstance | HostTextInstance,
    beforeChild: HostInstance | HostTextInstance | HostSuspenseInstance,
  ): void {
    bridge.insertBefore(parentInstance, child, beforeChild)
  },

  insertInContainerBefore(
    container: HostContainer,
    child: HostInstance | HostTextInstance,
    beforeChild: HostInstance | HostTextInstance | HostSuspenseInstance,
  ): void {
    bridge.insertInContainerBefore(container, child, beforeChild)
  },

  removeChild(
    parentInstance: HostInstance,
    child: HostInstance | HostTextInstance | HostSuspenseInstance,
  ): void {
    bridge.removeChild(parentInstance, child)
  },

  removeChildFromContainer(
    container: HostContainer,
    child: HostInstance | HostTextInstance | HostSuspenseInstance,
  ): void {
    bridge.removeChildFromContainer(container, child)
  },

  resetTextContent(_instance: HostInstance): void {
    throw new Error('Not implemented yet.')
  },

  commitTextUpdate(
    textInstance: HostTextInstance,
    _oldText: string,
    newText: string,
  ): void {
    bridge.commitTextUpdate(textInstance, newText)
  },

  commitMount(
    _instance: HostInstance,
    _type: HostType,
    _props: HostProps,
    _internalInstanceHandle: OpaqueHandle,
  ): void {
    throw new Error('Not implemented yet.')
  },

  commitUpdate(
    _instance: HostInstance,
    updatePayload: HostUpdatePayload,
    _type: HostType,
    _prevProps: HostProps,
    _nextProps: HostProps,
    _internalHandle: OpaqueHandle,
  ): void {
    bridge.commitUpdate(updatePayload)
  },

  hideInstance(instance: HostInstance): void {
    bridge.hideInstance(instance)
  },

  hideTextInstance(textInstance: HostTextInstance): void {
    bridge.hideTextInstance(textInstance)
  },

  unhideInstance(instance: HostInstance, props: HostProps): void {
    bridge.unhideInstance(instance, props)
  },

  unhideTextInstance(textInstance: HostTextInstance, text: string): void {
    bridge.unhideTextInstance(textInstance, text)
  },

  clearContainer(container: HostContainer): void {
    bridge.clearContainer(container)
  },

  supportsHydration: false,

  supportsPersistence: false,
})

export default createHostConfig
