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
  Message,
  removeChild,
  removeChildFromContainer,
  unhideInstance,
} from './messages'

type Callback = (...args: unknown[]) => unknown

const isCallback = (arg: unknown): arg is Callback => typeof arg === 'function'

const isObject = (arg: unknown): arg is Record<string, unknown> =>
  typeof arg === 'object' && arg !== null

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
export type TimeoutHandle = NodeJS.Timeout
export type NoTimeout = -1
export type OpaqueHandle = unknown

const filterProps = <P extends Record<string, unknown>>(props: P): P => ({
  ...props,
  children: undefined,
})

const generateHostConfig = (
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
> => {
  let nextInstanceId = 1
  let nextCallbackId = 1
  const mappedCallbacksById: Record<number, Callback | undefined> = {}

  const rootHostContext = {}

  // TODO: Could definitely add real typing here with mapped types.
  const mapCallbacks = <T extends unknown>(obj: T): T => {
    if (Array.isArray(obj)) {
      return obj.map(mapCallbacks) as T
    }

    if (isObject(obj)) {
      return Object.keys(obj).reduce((current, key) => {
        const value = obj[key]

        if (isCallback(value)) {
          const callbackId = nextCallbackId++
          mappedCallbacksById[callbackId] = value

          return {
            ...current,
            [key]: callbackId,
          }
        }

        return {
          ...current,
          [key]: mapCallbacks(value),
        }
      }, {}) as T
    }

    return obj
  }

  const send = (message: Message) => {
    ws.send(JSON.stringify(mapCallbacks(message)))
  }

  ws.on('ping', ws.pong)

  return {
    supportsMutation: true,
    supportsHydration: false,
    supportsPersistence: false,

    isPrimaryRenderer: true,
    now: performance.now,
    scheduleTimeout: setTimeout,
    cancelTimeout: clearTimeout,
    noTimeout: -1,
    queueMicrotask: queueMicrotask,

    createInstance(
      type: Type,
      props: Props,
      rootContainer: Container,
      hostContext: HostContext,
      internalHandle: OpaqueHandle
    ): Instance {
      const instanceId = nextInstanceId++
      send(createInstance(instanceId, type, filterProps(props)))
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
      send(appendInitialChild(parentId, childId))
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

    appendChild(parentId: Instance, childId: Instance | TextInstance) {
      send(appendChild(parentId, childId))
    },

    appendChildToContainer(
      containerId: Container,
      childId: Instance | TextInstance
    ) {
      send(appendChildToContainer(containerId, childId))
    },

    insertBefore(
      parentId: Instance,
      childId: Instance | TextInstance,
      beforeChildId: Instance | TextInstance | SuspenseInstance
    ) {
      send(insertBefore(parentId, childId, beforeChildId))
    },

    insertInContainerBefore(
      containerId: Container,
      childId: Instance | TextInstance,
      beforeChildId: Instance | TextInstance | SuspenseInstance
    ) {
      send(insertInContainerBefore(containerId, childId, beforeChildId))
    },

    removeChild(
      parentId: Instance,
      childId: Instance | TextInstance | SuspenseInstance
    ) {
      send(removeChild(parentId, childId))
    },

    removeChildFromContainer(
      containerId: Container,
      childId: Instance | TextInstance | SuspenseInstance
    ) {
      send(removeChildFromContainer(containerId, childId))
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
      // TODO: Could probably send a diff of the props rather than both.
      send(
        commitUpdate(instanceId, filterProps(prevProps), filterProps(nextProps))
      )
    },

    hideInstance(instanceId: Instance) {
      send(hideInstance(instanceId))
    },

    hideTextInstance(textInstance: TextInstance) {},

    unhideInstance(instanceId: Instance, props: Props) {
      send(unhideInstance(instanceId, filterProps(props)))
    },

    unhideTextInstance(textInstance: TextInstance, text: string) {},

    clearContainer(containerId: Container) {
      send(clearContainer(containerId))
    },
  }
}

const createHostConfig = async (
  host: string
): Promise<
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
  >
> => {
  return new Promise(resolve => {
    const ws = new WebSocket(host)
    ws.on('open', () => resolve(generateHostConfig(ws)))
  })
}

export default createHostConfig
