import { performance } from 'perf_hooks'
import { HostConfig, OpaqueHandle } from 'react-reconciler'
import ReactSwingBridge, {
  HostChildSet,
  HostContainer,
  HostContext,
  HostHydratableInstance,
  HostInstance,
  HostNoTimeout,
  HostProps,
  HostPublicInstance,
  HostSuspenseInstance,
  HostTextInstance,
  HostTimeoutHandle,
  HostType,
  HostUpdatePayload,
} from './bridge'

const createHostConfig = (
  bridge: ReactSwingBridge,
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
    parentId: HostInstance,
    childId: HostInstance | HostTextInstance,
  ) {
    bridge.appendInitialChild(parentId, childId)
  },

  finalizeInitialChildren(
    _instanceId: HostInstance,
    _type: HostType,
    _props: HostProps,
    _rootContainer: HostContainer,
    _hostContext: HostContext,
  ): boolean {
    return false
  },

  prepareUpdate(
    _instance: HostInstance,
    _type: HostType,
    _oldProps: HostProps,
    _newProps: HostProps,
    _rootContainer: HostContainer,
    _hostContext: HostContext,
  ): HostUpdatePayload | null {
    return null
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
    return instance
  },

  prepareForCommit(
    _containerInfo: HostContainer,
  ): Record<string, unknown> | null {
    return null
  },

  resetAfterCommit(_containerInfo: HostContainer) {
    // NOOP
  },

  preparePortalMount(_containerInfo: HostContainer) {
    // NOOP
  },

  appendChild(
    parentId: HostInstance,
    childId: HostInstance | HostTextInstance,
  ) {
    bridge.appendChild(parentId, childId)
  },

  appendChildToContainer(
    containerId: HostContainer,
    childId: HostInstance | HostTextInstance,
  ) {
    bridge.appendChildToContainer(containerId, childId)
  },

  insertBefore(
    parentId: HostInstance,
    childId: HostInstance | HostTextInstance,
    beforeChildId: HostInstance | HostTextInstance | HostSuspenseInstance,
  ) {
    bridge.insertBefore(parentId, childId, beforeChildId)
  },

  insertInContainerBefore(
    containerId: HostContainer,
    childId: HostInstance | HostTextInstance,
    beforeChildId: HostInstance | HostTextInstance | HostSuspenseInstance,
  ) {
    bridge.insertInContainerBefore(containerId, childId, beforeChildId)
  },

  removeChild(
    parentId: HostInstance,
    childId: HostInstance | HostTextInstance | HostSuspenseInstance,
  ) {
    bridge.removeChild(parentId, childId)
  },

  removeChildFromContainer(
    containerId: HostContainer,
    childId: HostInstance | HostTextInstance | HostSuspenseInstance,
  ) {
    bridge.removeChildFromContainer(containerId, childId)
  },

  resetTextContent(_instanceId: HostInstance) {
    throw new Error('Not yet implemented')
  },

  commitTextUpdate(
    instanceId: HostTextInstance,
    oldText: string,
    newText: string,
  ) {
    bridge.commitTextUpdate(instanceId, oldText, newText)
  },

  commitMount(
    _instanceId: HostInstance,
    _type: HostType,
    _props: HostProps,
    _internalInstanceHandle: OpaqueHandle,
  ) {
    throw new Error('Not yet implemented.')
  },

  commitUpdate(
    instanceId: HostInstance,
    _updatePayload: HostUpdatePayload,
    type: HostType,
    prevProps: HostProps,
    nextProps: HostProps,
    _internalHandle: OpaqueHandle,
  ) {
    bridge.commitUpdate(instanceId, type, prevProps, nextProps)
  },

  hideInstance(_instanceId: HostInstance) {
    throw new Error('Not yet implemented.')
  },

  hideTextInstance(_textInstance: HostTextInstance) {
    throw new Error('Not yet implemented.')
  },

  unhideInstance(_instanceId: HostInstance, _props: HostProps) {
    throw new Error('Not yet implemented.')
  },

  unhideTextInstance(_textInstance: HostTextInstance, _text: string) {
    throw new Error('Not yet implemented.')
  },

  clearContainer(containerId: HostContainer) {
    bridge.clearContainer(containerId)
  },
})

export default createHostConfig
