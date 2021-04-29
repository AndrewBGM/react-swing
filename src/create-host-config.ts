import { performance } from 'perf_hooks'
import { HostConfig, OpaqueHandle } from 'react-reconciler'
import { Client, UpdatePayload } from './client'

export type HostType = string
export type HostProps = Record<string, unknown>
export type HostContainer = number
export type HostInstance = number
export type HostTextInstance = number
export type HostSuspenseInstance = number
export type HostHydratableInstance = number
export type HostPublicInstance = number
export type HostContext = Record<string, unknown>
export type HostUpdatePayload = UpdatePayload
export type HostChildSet = unknown
export type HostTimeoutHandle = NodeJS.Timeout
export type HostNoTimeout = -1

const createHostConfig = (
  client: Client,
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
    return client.createInstance(type, props)
  },

  createTextInstance(
    text: string,
    _rootContainer: HostContainer,
    _hostContext: HostContext,
    _internalHandle: OpaqueHandle,
  ): HostTextInstance {
    return client.createTextInstance(text)
  },

  appendInitialChild(
    parentInstance: HostInstance,
    child: HostInstance | HostTextInstance,
  ): void {
    client.appendInitialChild(parentInstance, child)
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
    _instance: HostInstance,
    _type: HostType,
    oldProps: HostProps,
    newProps: HostProps,
    _rootContainer: HostContainer,
    _hostContext: HostContext,
  ): HostUpdatePayload | null {
    return client.prepareUpdate(oldProps, newProps)
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
    client.appendChild(parentInstance, child)
  },

  appendChildToContainer(
    container: HostContainer,
    child: HostInstance | HostTextInstance,
  ): void {
    client.appendChildToContainer(container, child)
  },

  insertBefore(
    parentInstance: HostInstance,
    child: HostInstance | HostTextInstance,
    beforeChild: HostInstance | HostTextInstance | HostSuspenseInstance,
  ): void {
    client.insertBefore(parentInstance, child, beforeChild)
  },

  insertInContainerBefore(
    container: HostContainer,
    child: HostInstance | HostTextInstance,
    beforeChild: HostInstance | HostTextInstance | HostSuspenseInstance,
  ): void {
    client.insertInContainerBefore(container, child, beforeChild)
  },

  removeChild(
    parentInstance: HostInstance,
    child: HostInstance | HostTextInstance | HostSuspenseInstance,
  ): void {
    client.removeChild(parentInstance, child)
  },

  removeChildFromContainer(
    container: HostContainer,
    child: HostInstance | HostTextInstance | HostSuspenseInstance,
  ): void {
    client.removeChildFromContainer(container, child)
  },

  resetTextContent(_instance: HostInstance): void {
    throw new Error('Not implemented yet.')
  },

  commitTextUpdate(
    textInstance: HostTextInstance,
    oldText: string,
    newText: string,
  ): void {
    client.commitTextUpdate(textInstance, oldText, newText)
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
    instance: HostInstance,
    updatePayload: HostUpdatePayload,
    _type: HostType,
    _prevProps: HostProps,
    _nextProps: HostProps,
    _internalHandle: OpaqueHandle,
  ): void {
    client.commitUpdate(instance, updatePayload)
  },

  hideInstance(_instance: HostInstance): void {
    throw new Error('Not implemented yet.')
  },

  hideTextInstance(_textInstance: HostTextInstance): void {
    throw new Error('Not implemented yet.')
  },

  unhideInstance(_instance: HostInstance, _props: HostProps): void {
    throw new Error('Not implemented yet.')
  },

  unhideTextInstance(_textInstance: HostTextInstance, _text: string): void {
    throw new Error('Not implemented yet.')
  },

  clearContainer(container: HostContainer): void {
    client.clearContainer(container)
  },

  supportsHydration: false,

  supportsPersistence: false,
})

export default createHostConfig
