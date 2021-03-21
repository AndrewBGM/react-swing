import { performance } from 'perf_hooks'
import { HostConfig } from 'react-reconciler'
import WebSocket from 'ws'

export type Type = number
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
    const id = nextInstanceId++
    return id
  },

  createTextInstance(
    text: string,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: OpaqueHandle
  ): TextInstance {
    throw new Error('Text instances are not supported.')
  },

  appendInitialChild(
    parentInstance: Instance,
    child: Instance | TextInstance
  ) {},

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

  appendChild(
    parentInstance: Instance,
    child: Instance | TextInstance
  ): void {},

  appendChildToContainer(
    container: Container,
    child: Instance | TextInstance
  ): void {},

  insertBefore(
    parentInstance: Instance,
    child: Instance | TextInstance,
    beforeChild: Instance | TextInstance | SuspenseInstance
  ): void {},

  insertInContainerBefore(
    container: Container,
    child: Instance | TextInstance,
    beforeChild: Instance | TextInstance | SuspenseInstance
  ): void {},

  removeChild(
    parentInstance: Instance,
    child: Instance | TextInstance | SuspenseInstance
  ): void {},

  removeChildFromContainer(
    container: Container,
    child: Instance | TextInstance | SuspenseInstance
  ): void {},

  resetTextContent(instance: Instance): void {},

  commitTextUpdate(
    textInstance: TextInstance,
    oldText: string,
    newText: string
  ): void {},

  commitMount(
    instance: Instance,
    type: Type,
    props: Props,
    internalInstanceHandle: OpaqueHandle
  ): void {},

  commitUpdate(
    instance: Instance,
    updatePayload: UpdatePayload,
    type: Type,
    prevProps: Props,
    nextProps: Props,
    internalHandle: OpaqueHandle
  ): void {},

  hideInstance(instance: Instance): void {},

  hideTextInstance(textInstance: TextInstance): void {},

  unhideInstance(instance: Instance, props: Props): void {},

  unhideTextInstance(textInstance: TextInstance, text: string): void {},

  clearContainer(container: Container): void {},

  supportsHydration: false,

  supportsPersistence: false,
})

export default createHostConfig
