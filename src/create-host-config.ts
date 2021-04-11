import { performance } from 'perf_hooks'
import { HostConfig, OpaqueHandle } from 'react-reconciler'
import Bridge, {
  BridgeChildSet,
  BridgeContainer,
  BridgeHostContext,
  BridgeHydratableInstance,
  BridgeInstance,
  BridgeNoTimeout,
  BridgeProps,
  BridgePublicInstance,
  BridgeSuspenseInstance,
  BridgeTextInstance,
  BridgeTimeoutHandle,
  BridgeType,
  BridgeUpdatePayload,
} from './bridge'

const createHostConfig = (
  bridge: Bridge,
): HostConfig<
  BridgeType,
  BridgeProps,
  BridgeContainer,
  BridgeInstance,
  BridgeTextInstance,
  BridgeSuspenseInstance,
  BridgeHydratableInstance,
  BridgePublicInstance,
  BridgeHostContext,
  BridgeUpdatePayload,
  BridgeChildSet,
  BridgeTimeoutHandle,
  BridgeNoTimeout
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
    _hostContext: BridgeHostContext,
    _internalHandle: OpaqueHandle,
  ): BridgeInstance {
    return bridge.createInstance(type, props)
  },

  createTextInstance(
    text: string,
    _rootContainer: BridgeContainer,
    _hostContext: BridgeHostContext,
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
    _hostContext: BridgeHostContext,
  ): boolean {
    return false
  },

  prepareUpdate(
    _instance: BridgeInstance,
    type: BridgeType,
    oldProps: BridgeProps,
    newProps: BridgeProps,
    _rootContainer: BridgeContainer,
    _hostContext: BridgeHostContext,
  ): BridgeUpdatePayload | null {
    return bridge.prepareUpdate(type, oldProps, newProps)
  },

  shouldSetTextContent(_type: BridgeType, _props: BridgeProps): boolean {
    return false
  },

  getRootHostContext(
    _rootContainer: BridgeContainer,
  ): BridgeHostContext | null {
    return null
  },

  getChildHostContext(
    parentHostContext: BridgeHostContext,
    _type: BridgeType,
    _rootContainer: BridgeContainer,
  ): BridgeHostContext {
    return parentHostContext
  },

  getPublicInstance(
    instance: BridgeInstance | BridgeTextInstance,
  ): BridgePublicInstance {
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

  commitTextUpdate(
    textInstance: BridgeTextInstance,
    oldText: string,
    newText: string,
  ): void {
    bridge.commitTextUpdate(textInstance, oldText, newText)
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
