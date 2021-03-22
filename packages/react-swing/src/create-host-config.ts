import { performance } from 'perf_hooks'
import { HostConfig } from 'react-reconciler'
import WebSocket from 'ws'
import {
  appendChild,
  appendChildToContainer,
  appendInitialChild,
  clearContainer,
  commitUpdate,
  createInstance,
  hideInstance,
  insertBefore,
  insertInContainerBefore,
  removeChild,
  removeChildFromContainer,
  unhideInstance,
} from './messages'

export type Type = string
export type Props = Record<string, unknown>
export type Container = number
export type Instance = number
export type TextInstance = number
export type SuspenseInstance = number
export type HydratableInstance = number
export type PublicInstance = number
export type HostContext = Record<string, unknown>
export type UpdatePayload = unknown
export type ChildSet = unknown
export type TimeoutHandle = number
export type NoTimeout = -1
export type OpaqueHandle = unknown

let nextInstanceId = 0
const rootHostContext = {}

const createHostConfig = (
  ws: WebSocket
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
  isPrimaryRenderer: true,
  now: performance.now,
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
    const instanceId = nextInstanceId++
    ws.send(createInstance(instanceId, type, props))
    return instanceId
  },

  createTextInstance(
    text: string,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: OpaqueHandle
  ): TextInstance {
    throw new Error('Text instances are not supported.')
  },

  appendInitialChild(parentId: Instance, childId: Instance | TextInstance) {
    ws.send(appendInitialChild(parentId, childId))
  },

  finalizeInitialChildren(
    instance: Instance,
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext
  ): boolean {
    return false
  },

  prepareUpdate(
    instance: Instance,
    type: Type,
    oldProps: Props,
    newProps: Props,
    rootContainer: Container,
    hostContext: HostContext
  ): UpdatePayload | null {
    return null
  },

  shouldSetTextContent(type: Type, props: Props): boolean {
    return false
  },

  getRootHostContext(rootContainer: Container): HostContext | null {
    return rootHostContext
  },

  getChildHostContext(
    parentHostContext: HostContext,
    type: Type,
    rootContainer: Container
  ): HostContext {
    return parentHostContext
  },

  getPublicInstance(instance: Instance | TextInstance): PublicInstance {
    return instance
  },

  prepareForCommit(containerInfo: Container): Record<string, any> | null {
    return null
  },

  resetAfterCommit(containerInfo: Container) {},

  preparePortalMount(containerInfo: Container) {},

  supportsMutation: true,

  appendChild(parentId: Instance, childId: Instance | TextInstance) {
    ws.send(appendChild(parentId, childId))
  },

  appendChildToContainer(
    containerId: Container,
    childId: Instance | TextInstance
  ) {
    ws.send(appendChildToContainer(containerId, childId))
  },

  insertBefore(
    parentId: Instance,
    childId: Instance | TextInstance,
    beforeChildId: Instance | TextInstance | SuspenseInstance
  ) {
    ws.send(insertBefore(parentId, childId, beforeChildId))
  },

  insertInContainerBefore(
    containerId: Container,
    childId: Instance | TextInstance,
    beforeChildId: Instance | TextInstance | SuspenseInstance
  ) {
    ws.send(insertInContainerBefore(containerId, childId, beforeChildId))
  },

  removeChild(
    parentId: Instance,
    childId: Instance | TextInstance | SuspenseInstance
  ) {
    ws.send(removeChild(parentId, childId))
  },

  removeChildFromContainer(
    containerId: Container,
    childId: Instance | TextInstance | SuspenseInstance
  ) {
    ws.send(removeChildFromContainer(containerId, childId))
  },

  resetTextContent(instance: Instance) {},

  commitTextUpdate(
    textInstance: TextInstance,
    oldText: string,
    newText: string
  ) {},

  commitMount(
    instance: Instance,
    type: Type,
    props: Props,
    internalInstanceHandle: OpaqueHandle
  ) {},

  commitUpdate(
    instanceId: Instance,
    updatePayload: UpdatePayload,
    type: Type,
    prevProps: Props,
    nextProps: Props,
    internalHandle: OpaqueHandle
  ) {
    ws.send(commitUpdate(instanceId, prevProps, nextProps))
  },

  hideInstance(instanceId: Instance) {
    ws.send(hideInstance(instanceId))
  },

  hideTextInstance(textInstance: TextInstance) {},

  unhideInstance(instanceId: Instance, props: Props) {
    ws.send(unhideInstance(instanceId, props))
  },

  unhideTextInstance(textInstance: TextInstance, text: string) {},

  clearContainer(containerId: Container) {
    ws.send(clearContainer(containerId))
  },

  supportsHydration: false,

  supportsPersistence: false,
})

export default createHostConfig
