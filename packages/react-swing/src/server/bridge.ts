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

export interface BridgeOptions {
  host: string
}

class Bridge
  implements
    HostConfig<
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
    > {
  private ws!: WebSocket
  private nextInstanceId = 1
  private rootHostContext = {}

  readonly supportsMutation = true
  readonly supportsHydration = false
  readonly supportsPersistence = false

  readonly isPrimaryRenderer = true
  readonly now = performance.now
  readonly scheduleTimeout = setTimeout
  readonly cancelTimeout = clearTimeout
  readonly noTimeout = -1
  readonly queueMicrotask = queueMicrotask

  constructor(readonly options: BridgeOptions) {}

  connect() {
    const { host } = this.options
    return new Promise(resolve => {
      this.ws = new WebSocket(host)
      this.ws.on('open', resolve)
    })
  }

  createInstance(
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: OpaqueHandle
  ): Instance {
    const instanceId = this.nextInstanceId++
    this.ws.send(createInstance(instanceId, type, props))
    return instanceId
  }

  createTextInstance(
    text: string,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: OpaqueHandle
  ): TextInstance {
    throw new Error('Text instances are not supported.')
  }

  appendInitialChild(parentId: Instance, childId: Instance | TextInstance) {
    this.ws.send(appendInitialChild(parentId, childId))
  }

  finalizeInitialChildren(
    instance: Instance,
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext
  ): boolean {
    return false
  }

  prepareUpdate(
    instance: Instance,
    type: Type,
    oldProps: Props,
    newProps: Props,
    rootContainer: Container,
    hostContext: HostContext
  ): UpdatePayload | null {
    return null
  }

  shouldSetTextContent(type: Type, props: Props): boolean {
    return false
  }

  getRootHostContext(rootContainer: Container): HostContext | null {
    return this.rootHostContext
  }

  getChildHostContext(
    parentHostContext: HostContext,
    type: Type,
    rootContainer: Container
  ): HostContext {
    return parentHostContext
  }

  getPublicInstance(instance: Instance | TextInstance): PublicInstance {
    return instance
  }

  prepareForCommit(containerInfo: Container): Record<string, any> | null {
    return null
  }

  resetAfterCommit(containerInfo: Container) {}

  preparePortalMount(containerInfo: Container) {}

  appendChild(parentId: Instance, childId: Instance | TextInstance) {
    this.ws.send(appendChild(parentId, childId))
  }

  appendChildToContainer(
    containerId: Container,
    childId: Instance | TextInstance
  ) {
    this.ws.send(appendChildToContainer(containerId, childId))
  }

  insertBefore(
    parentId: Instance,
    childId: Instance | TextInstance,
    beforeChildId: Instance | TextInstance | SuspenseInstance
  ) {
    this.ws.send(insertBefore(parentId, childId, beforeChildId))
  }

  insertInContainerBefore(
    containerId: Container,
    childId: Instance | TextInstance,
    beforeChildId: Instance | TextInstance | SuspenseInstance
  ) {
    this.ws.send(insertInContainerBefore(containerId, childId, beforeChildId))
  }

  removeChild(
    parentId: Instance,
    childId: Instance | TextInstance | SuspenseInstance
  ) {
    this.ws.send(removeChild(parentId, childId))
  }

  removeChildFromContainer(
    containerId: Container,
    childId: Instance | TextInstance | SuspenseInstance
  ) {
    this.ws.send(removeChildFromContainer(containerId, childId))
  }

  resetTextContent(instance: Instance) {}

  commitTextUpdate(
    textInstance: TextInstance,
    oldText: string,
    newText: string
  ) {}

  commitMount(
    instance: Instance,
    type: Type,
    props: Props,
    internalInstanceHandle: OpaqueHandle
  ) {}

  commitUpdate(
    instanceId: Instance,
    updatePayload: UpdatePayload,
    type: Type,
    prevProps: Props,
    nextProps: Props,
    internalHandle: OpaqueHandle
  ) {
    this.ws.send(commitUpdate(instanceId, prevProps, nextProps))
  }

  hideInstance(instanceId: Instance) {
    this.ws.send(hideInstance(instanceId))
  }

  hideTextInstance(textInstance: TextInstance) {}

  unhideInstance(instanceId: Instance, props: Props) {
    this.ws.send(unhideInstance(instanceId, props))
  }

  unhideTextInstance(textInstance: TextInstance, text: string) {}

  clearContainer(containerId: Container) {
    this.ws.send(clearContainer(containerId))
  }
}

export default Bridge
