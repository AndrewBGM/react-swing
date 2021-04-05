import { performance } from 'perf_hooks'
import { HostConfig, OpaqueHandle } from 'react-reconciler'
import ReactSwingBridge, {
  BridgeChildSet,
  BridgeContainer,
  BridgeContext,
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
  bridge: ReactSwingBridge,
): HostConfig<
  BridgeType,
  BridgeProps,
  BridgeContainer,
  BridgeInstance,
  BridgeTextInstance,
  BridgeSuspenseInstance,
  BridgeHydratableInstance,
  BridgePublicInstance,
  BridgeContext,
  BridgeUpdatePayload,
  BridgeChildSet,
  BridgeTimeoutHandle,
  BridgeNoTimeout
> => ({
  supportsMutation: true,
  supportsHydration: false,
  supportsPersistence: false,

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
    _hostContext: BridgeContext,
    _internalHandle: OpaqueHandle,
  ): BridgeInstance {
    return bridge.createInstance(type, props)
  },

  createTextInstance(
    text: string,
    _rootContainer: BridgeContainer,
    _hostContext: BridgeContext,
    _internalHandle: OpaqueHandle,
  ): BridgeTextInstance {
    return bridge.createTextInstance(text)
  },

  appendInitialChild(
    parentId: BridgeInstance,
    childId: BridgeInstance | BridgeTextInstance,
  ) {
    bridge.appendInitialChild(parentId, childId)
  },

  finalizeInitialChildren(
    _instanceId: BridgeInstance,
    _type: BridgeType,
    _props: BridgeProps,
    _rootContainer: BridgeContainer,
    _hostContext: BridgeContext,
  ): boolean {
    return false
  },

  prepareUpdate(
    _instance: BridgeInstance,
    type: BridgeType,
    oldProps: BridgeProps,
    newProps: BridgeProps,
    _rootContainer: BridgeContainer,
    _hostContext: BridgeContext,
  ): BridgeUpdatePayload | null {
    return bridge.prepareUpdate(type, oldProps, newProps)
  },

  shouldSetTextContent(_type: BridgeType, _props: BridgeProps): boolean {
    return false
  },

  getRootHostContext(_rootContainer: BridgeContainer): BridgeContext | null {
    return null
  },

  getChildHostContext(
    parentHostContext: BridgeContext,
    _type: BridgeType,
    _rootContainer: BridgeContainer,
  ): BridgeContext {
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

  resetAfterCommit(_containerInfo: BridgeContainer) {
    // NOOP
  },

  preparePortalMount(_containerInfo: BridgeContainer) {
    // NOOP
  },

  appendChild(
    parentId: BridgeInstance,
    childId: BridgeInstance | BridgeTextInstance,
  ) {
    bridge.appendChild(parentId, childId)
  },

  appendChildToContainer(
    containerId: BridgeContainer,
    childId: BridgeInstance | BridgeTextInstance,
  ) {
    bridge.appendChildToContainer(containerId, childId)
  },

  insertBefore(
    parentId: BridgeInstance,
    childId: BridgeInstance | BridgeTextInstance,
    beforeChildId: BridgeInstance | BridgeTextInstance | BridgeSuspenseInstance,
  ) {
    bridge.insertBefore(parentId, childId, beforeChildId)
  },

  insertInContainerBefore(
    containerId: BridgeContainer,
    childId: BridgeInstance | BridgeTextInstance,
    beforeChildId: BridgeInstance | BridgeTextInstance | BridgeSuspenseInstance,
  ) {
    bridge.insertInContainerBefore(containerId, childId, beforeChildId)
  },

  removeChild(
    parentId: BridgeInstance,
    childId: BridgeInstance | BridgeTextInstance | BridgeSuspenseInstance,
  ) {
    bridge.removeChild(parentId, childId)
  },

  removeChildFromContainer(
    containerId: BridgeContainer,
    childId: BridgeInstance | BridgeTextInstance | BridgeSuspenseInstance,
  ) {
    bridge.removeChildFromContainer(containerId, childId)
  },

  resetTextContent(_instanceId: BridgeInstance) {
    throw new Error('Not yet implemented')
  },

  commitTextUpdate(
    instanceId: BridgeTextInstance,
    oldText: string,
    newText: string,
  ) {
    bridge.commitTextUpdate(instanceId, oldText, newText)
  },

  commitMount(
    _instanceId: BridgeInstance,
    _type: BridgeType,
    _props: BridgeProps,
    _internalInstanceHandle: OpaqueHandle,
  ) {
    throw new Error('Not yet implemented.')
  },

  commitUpdate(
    instanceId: BridgeInstance,
    updatePayload: BridgeUpdatePayload,
    _type: BridgeType,
    _prevProps: BridgeProps,
    _nextProps: BridgeProps,
    _internalHandle: OpaqueHandle,
  ) {
    bridge.commitUpdate(instanceId, updatePayload)
  },

  hideInstance(_instanceId: BridgeInstance) {
    throw new Error('Not yet implemented.')
  },

  hideTextInstance(_textInstance: BridgeTextInstance) {
    throw new Error('Not yet implemented.')
  },

  unhideInstance(_instanceId: BridgeInstance, _props: BridgeProps) {
    throw new Error('Not yet implemented.')
  },

  unhideTextInstance(_textInstance: BridgeTextInstance, _text: string) {
    throw new Error('Not yet implemented.')
  },

  clearContainer(containerId: BridgeContainer) {
    bridge.clearContainer(containerId)
  },
})

export default createHostConfig
