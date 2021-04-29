import { performance } from 'perf_hooks'
import { HostConfig, OpaqueHandle } from 'react-reconciler'
import { Client } from './client'

export type HostType = unknown
export type HostProps = unknown
export type HostContainer = unknown
export type HostInstance = unknown
export type HostTextInstance = unknown
export type HostSuspenseInstance = unknown
export type HostHydratableInstance = unknown
export type HostPublicInstance = unknown
export type HostContext = unknown
export type HostUpdatePayload = unknown
export type HostChildSet = unknown
export type HostTimeoutHandle = NodeJS.Timeout
export type HostNoTimeout = -1

const createHostConfig = (
  _client: Client,
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
    _type: HostType,
    _props: HostProps,
    _rootContainer: HostContainer,
    _hostContext: HostContext,
    _internalHandle: OpaqueHandle,
  ): HostInstance {
    throw new Error('Not implemented yet.')
  },

  createTextInstance(
    _text: string,
    _rootContainer: HostContainer,
    _hostContext: HostContext,
    _internalHandle: OpaqueHandle,
  ): HostTextInstance {
    throw new Error('Not implemented yet.')
  },

  appendInitialChild(
    _parentInstance: HostInstance,
    _child: HostInstance | HostTextInstance,
  ): void {
    throw new Error('Not implemented yet.')
  },

  finalizeInitialChildren(
    _instance: HostInstance,
    _type: HostType,
    _props: HostProps,
    _rootContainer: HostContainer,
    _hostContext: HostContext,
  ): boolean {
    throw new Error('Not implemented yet.')
  },

  prepareUpdate(
    _instance: HostInstance,
    _type: HostType,
    _oldProps: HostProps,
    _newProps: HostProps,
    _rootContainer: HostContainer,
    _hostContext: HostContext,
  ): HostUpdatePayload | null {
    throw new Error('Not implemented yet.')
  },

  shouldSetTextContent(_type: HostType, _props: HostProps): boolean {
    throw new Error('Not implemented yet.')
  },

  getRootHostContext(_rootContainer: HostContainer): HostContext | null {
    throw new Error('Not implemented yet.')
  },

  getChildHostContext(
    _parentHostContext: HostContext,
    _type: HostType,
    _rootContainer: HostContainer,
  ): HostContext {
    throw new Error('Not implemented yet.')
  },

  getPublicInstance(
    _instance: HostInstance | HostTextInstance,
  ): HostPublicInstance {
    throw new Error('Not implemented yet.')
  },

  prepareForCommit(
    _containerInfo: HostContainer,
  ): Record<string, unknown> | null {
    throw new Error('Not implemented yet.')
  },

  resetAfterCommit(_containerInfo: HostContainer): void {
    // noop
  },

  preparePortalMount(_containerInfo: HostContainer): void {
    // noop
  },

  supportsMutation: true,

  appendChild(
    _parentInstance: HostInstance,
    _child: HostInstance | HostTextInstance,
  ): void {
    throw new Error('Not implemented yet.')
  },

  appendChildToContainer(
    _container: HostContainer,
    _child: HostInstance | HostTextInstance,
  ): void {
    throw new Error('Not implemented yet.')
  },

  insertBefore(
    _parentInstance: HostInstance,
    _child: HostInstance | HostTextInstance,
    _beforeChild: HostInstance | HostTextInstance | HostSuspenseInstance,
  ): void {
    throw new Error('Not implemented yet.')
  },

  insertInContainerBefore(
    _container: HostContainer,
    _child: HostInstance | HostTextInstance,
    _beforeChild: HostInstance | HostTextInstance | HostSuspenseInstance,
  ): void {
    throw new Error('Not implemented yet.')
  },

  removeChild(
    _parentInstance: HostInstance,
    _child: HostInstance | HostTextInstance | HostSuspenseInstance,
  ): void {
    throw new Error('Not implemented yet.')
  },

  removeChildFromContainer(
    _container: HostContainer,
    _child: HostInstance | HostTextInstance | HostSuspenseInstance,
  ): void {
    throw new Error('Not implemented yet.')
  },

  resetTextContent(_instance: HostInstance): void {
    throw new Error('Not implemented yet.')
  },

  commitTextUpdate(
    _textInstance: HostTextInstance,
    _oldText: string,
    _newText: string,
  ): void {
    throw new Error('Not implemented yet.')
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
    _updatePayload: HostUpdatePayload,
    _type: HostType,
    _prevProps: HostProps,
    _nextProps: HostProps,
    _internalHandle: OpaqueHandle,
  ): void {
    throw new Error('Not implemented yet.')
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

  clearContainer(_container: HostContainer): void {
    throw new Error('Not implemented yet.')
  },

  supportsHydration: false,

  supportsPersistence: false,
})

export default createHostConfig
