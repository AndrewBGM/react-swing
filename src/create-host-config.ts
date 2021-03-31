import { performance } from 'perf_hooks'
import { HostConfig, OpaqueHandle } from 'react-reconciler'
import {
  Bridge,
  ChildSet,
  Container,
  HostContext,
  HydratableInstance,
  Instance,
  NoTimeout,
  Props,
  PublicInstance,
  SuspenseInstance,
  TextInstance,
  TimeoutHandle,
  Type,
  UpdatePayload,
} from './bridge'

const createHostConfig = (
  bridge: Bridge
): HostConfig<
  Type,
  Props,
  Container,
  Instance,
  TextInstance,
  SuspenseInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  ChildSet,
  TimeoutHandle,
  NoTimeout
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
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: OpaqueHandle
  ): Instance {
    return bridge.createInstance(
      type,
      props,
      rootContainer,
      hostContext,
      internalHandle
    )
  },

  createTextInstance(
    text: string,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: OpaqueHandle
  ): TextInstance {
    return bridge.createTextInstance(
      text,
      rootContainer,
      hostContext,
      internalHandle
    )
  },

  appendInitialChild(parentId: Instance, childId: Instance | TextInstance) {
    bridge.appendInitialChild(parentId, childId)
  },

  finalizeInitialChildren(
    instance: Instance,
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext
  ): boolean {
    return bridge.finalizeInitialChildren(
      instance,
      type,
      props,
      rootContainer,
      hostContext
    )
  },

  prepareUpdate(
    instance: Instance,
    type: Type,
    oldProps: Props,
    newProps: Props,
    rootContainer: Container,
    hostContext: HostContext
  ): UpdatePayload | null {
    return bridge.prepareUpdate(
      instance,
      type,
      oldProps,
      newProps,
      rootContainer,
      hostContext
    )
  },

  shouldSetTextContent(type: Type, props: Props): boolean {
    return bridge.shouldSetTextContent(type, props)
  },

  getRootHostContext(rootContainer: Container): HostContext | null {
    return bridge.getRootHostContext(rootContainer)
  },

  getChildHostContext(
    parentHostContext: HostContext,
    type: Type,
    rootContainer: Container
  ): HostContext {
    return bridge.getChildHostContext(parentHostContext, type, rootContainer)
  },

  getPublicInstance(instance: Instance | TextInstance): PublicInstance {
    return bridge.getPublicInstance(instance)
  },

  prepareForCommit(containerInfo: Container): Record<string, unknown> | null {
    return bridge.prepareForCommit(containerInfo)
  },

  resetAfterCommit(containerInfo: Container) {
    bridge.resetAfterCommit(containerInfo)
  },

  preparePortalMount(containerInfo: Container) {
    bridge.preparePortalMount(containerInfo)
  },

  appendChild(parentId: Instance, childId: Instance | TextInstance) {
    bridge.appendChild(parentId, childId)
  },

  appendChildToContainer(
    containerId: Container,
    childId: Instance | TextInstance
  ) {
    bridge.appendChildToContainer(containerId, childId)
  },

  insertBefore(
    parentId: Instance,
    childId: Instance | TextInstance,
    beforeChildId: Instance | TextInstance | SuspenseInstance
  ) {
    bridge.insertBefore(parentId, childId, beforeChildId)
  },

  insertInContainerBefore(
    containerId: Container,
    childId: Instance | TextInstance,
    beforeChildId: Instance | TextInstance | SuspenseInstance
  ) {
    bridge.insertBefore(containerId, childId, beforeChildId)
  },

  removeChild(
    parentId: Instance,
    childId: Instance | TextInstance | SuspenseInstance
  ) {
    bridge.removeChild(parentId, childId)
  },

  removeChildFromContainer(
    containerId: Container,
    childId: Instance | TextInstance | SuspenseInstance
  ) {
    bridge.removeChild(containerId, childId)
  },

  resetTextContent(instance: Instance) {
    bridge.resetTextContent(instance)
  },

  commitTextUpdate(
    textInstance: TextInstance,
    oldText: string,
    newText: string
  ) {
    bridge.commitTextUpdate(textInstance, oldText, newText)
  },

  commitMount(
    instance: Instance,
    type: Type,
    props: Props,
    internalInstanceHandle: OpaqueHandle
  ) {
    bridge.commitMount(instance, type, props, internalInstanceHandle)
  },

  commitUpdate(
    instanceId: Instance,
    updatePayload: UpdatePayload,
    type: Type,
    prevProps: Props,
    nextProps: Props,
    internalHandle: OpaqueHandle
  ) {
    bridge.commitUpdate(
      instanceId,
      updatePayload,
      type,
      prevProps,
      nextProps,
      internalHandle
    )
  },

  hideInstance(instanceId: Instance) {
    bridge.hideInstance(instanceId)
  },

  hideTextInstance(textInstance: TextInstance) {
    bridge.hideTextInstance(textInstance)
  },

  unhideInstance(instanceId: Instance, props: Props) {
    bridge.unhideInstance(instanceId, props)
  },

  unhideTextInstance(textInstance: TextInstance, text: string) {
    bridge.unhideTextInstance(textInstance, text)
  },

  clearContainer(containerId: Container) {
    bridge.clearContainer(containerId)
  },
})

export default createHostConfig
