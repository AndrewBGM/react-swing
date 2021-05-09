import { performance } from 'perf_hooks'
import { HostConfig, OpaqueHandle } from 'react-reconciler'
import { v4 as uuid } from 'uuid'
import {
  Bridge,
  BridgeProps,
  BridgeType,
  BridgeUpdatePayload,
  BridgeView,
} from '../bridge'
import { filterChildren, shallowDiff } from '../utils'

export type HostType = BridgeType
export type HostProps = BridgeProps
export type HostContainer = BridgeView
export type HostInstance = BridgeView
export type HostTextInstance = BridgeView
export type HostSuspenseInstance = BridgeView
export type HostHydratableInstance = BridgeView
export type HostPublicInstance = string
export type HostContext = unknown
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
    return bridge.createView(uuid(), type, filterChildren(props))
  },

  createTextInstance(
    _text: string,
    _rootContainer: HostContainer,
    _hostContext: HostContext,
    _internalHandle: OpaqueHandle,
  ): HostTextInstance {
    throw new Error('Text instances are not supported')
  },

  appendInitialChild(
    parentInstance: HostInstance,
    child: HostInstance | HostTextInstance,
  ): void {
    parentInstance.appendChild(child)
  },

  finalizeInitialChildren(
    instance: HostInstance,
    _type: HostType,
    _props: HostProps,
    _rootContainer: HostContainer,
    _hostContext: HostContext,
  ): boolean {
    const children = instance.getChildren()
    if (children.length === 0) {
      return false
    }

    bridge.setChildren(instance, children)

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
    const prevProps = filterChildren(oldProps)
    const nextProps = filterChildren(newProps)
    const changedProps = shallowDiff(prevProps, nextProps)

    const needsUpdate = Object.keys(changedProps).length > 0
    if (!needsUpdate) {
      return null
    }

    return {
      changedProps,
    }
  },

  shouldSetTextContent(type: HostType, _props: HostProps): boolean {
    return ['BUTTON', 'LABEL', 'MENU_ITEM'].includes(type)
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
    bridge.appendChild(container, child)
  },

  insertBefore(
    parentInstance: HostInstance,
    child: HostInstance | HostTextInstance,
    beforeChild: HostInstance | HostTextInstance | HostSuspenseInstance,
  ): void {
    bridge.insertChild(parentInstance, child, beforeChild)
  },

  insertInContainerBefore(
    container: HostContainer,
    child: HostInstance | HostTextInstance,
    beforeChild: HostInstance | HostTextInstance | HostSuspenseInstance,
  ): void {
    bridge.insertChild(container, child, beforeChild)
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
    bridge.removeChild(container, child)
  },

  resetTextContent(_instance: HostInstance): void {
    throw new Error('Text instances are not supported')
  },

  commitTextUpdate(
    _textInstance: HostTextInstance,
    _oldText: string,
    _newText: string,
  ): void {
    throw new Error('Text instances are not supported')
  },

  commitMount(
    _instance: HostInstance,
    _type: HostType,
    _props: HostProps,
    _internalInstanceHandle: OpaqueHandle,
  ): void {
    // noop
  },

  commitUpdate(
    instance: HostInstance,
    updatePayload: HostUpdatePayload,
    _type: HostType,
    _prevProps: HostProps,
    _nextProps: HostProps,
    _internalHandle: OpaqueHandle,
  ): void {
    bridge.updateView(instance, updatePayload)
  },

  hideInstance(_instance: HostInstance): void {
    throw new Error('Suspense instances are not supported')
  },

  hideTextInstance(_textInstance: HostTextInstance): void {
    throw new Error('Suspense instances are not supported')
  },

  unhideInstance(_instance: HostInstance, _props: HostProps): void {
    throw new Error('Suspense instances are not supported')
  },

  unhideTextInstance(_textInstance: HostTextInstance, _text: string): void {
    throw new Error('Suspense instances are not supported')
  },

  clearContainer(container: HostContainer): void {
    bridge.setChildren(container, [])
  },

  supportsHydration: false,

  supportsPersistence: false,
})

export default createHostConfig
