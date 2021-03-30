import { performance } from 'perf_hooks'
import { HostConfig } from 'react-reconciler'
import WebSocket from 'ws'
import CallbackCache from './callback-cache'
import { Message, MessageType } from './messages'

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
  const rootHostContext = {}
  let nextInstanceId = 1

  const callbackCache = new CallbackCache()
  const send = (message: Message) => {
    ws.send(JSON.stringify(callbackCache.map(message)))
  }

  ws.on('ping', data => ws.pong(data))

  return {
    supportsMutation: true,
    supportsHydration: false,
    supportsPersistence: false,

    isPrimaryRenderer: true,
    now: () => performance.now(),
    scheduleTimeout: setTimeout,
    cancelTimeout: clearTimeout,
    noTimeout: -1,
    queueMicrotask: (callback: () => void) => queueMicrotask(callback),

    createInstance(
      type: Type,
      props: Props,
      _rootContainer: Container,
      _hostContext: HostContext,
      _internalHandle: OpaqueHandle
    ): Instance {
      const instanceId = nextInstanceId
      nextInstanceId += 1

      send({
        type: MessageType.CREATE_INSTANCE,
        payload: {
          instanceId,
          type,
          props: filterProps(props),
        },
      })

      return instanceId
    },

    createTextInstance(
      _text: string,
      _rootContainer: Container,
      _hostContext: HostContext,
      _internalHandle: OpaqueHandle
    ): TextInstance {
      throw new Error('Text instances are not supported.')
    },

    appendInitialChild(parentId: Instance, childId: Instance | TextInstance) {
      send({
        type: MessageType.APPEND_INITIAL_CHILD,
        payload: {
          parentId,
          childId,
        },
      })
    },

    finalizeInitialChildren(
      _instance: Instance,
      _type: Type,
      _props: Props,
      _rootContainer: Container,
      _hostContext: HostContext
    ): boolean {
      return false
    },

    prepareUpdate(
      _instance: Instance,
      _type: Type,
      _oldProps: Props,
      _newProps: Props,
      _rootContainer: Container,
      _hostContext: HostContext
    ): UpdatePayload | null {
      return null
    },

    shouldSetTextContent(_type: Type, _props: Props): boolean {
      return false
    },

    getRootHostContext(_rootContainer: Container): HostContext | null {
      return rootHostContext
    },

    getChildHostContext(
      parentHostContext: HostContext,
      _type: Type,
      _rootContainer: Container
    ): HostContext {
      return parentHostContext
    },

    getPublicInstance(instance: Instance | TextInstance): PublicInstance {
      return instance
    },

    prepareForCommit(
      _containerInfo: Container
    ): Record<string, unknown> | null {
      return null
    },

    resetAfterCommit(_containerInfo: Container) {},

    preparePortalMount(_containerInfo: Container) {},

    appendChild(parentId: Instance, childId: Instance | TextInstance) {
      send({
        type: MessageType.APPEND_CHILD,
        payload: {
          parentId,
          childId,
        },
      })
    },

    appendChildToContainer(
      containerId: Container,
      childId: Instance | TextInstance
    ) {
      send({
        type: MessageType.APPEND_CHILD_TO_CONTAINER,
        payload: {
          containerId,
          childId,
        },
      })
    },

    insertBefore(
      parentId: Instance,
      childId: Instance | TextInstance,
      beforeChildId: Instance | TextInstance | SuspenseInstance
    ) {
      send({
        type: MessageType.INSERT_BEFORE,
        payload: {
          parentId,
          childId,
          beforeChildId,
        },
      })
    },

    insertInContainerBefore(
      containerId: Container,
      childId: Instance | TextInstance,
      beforeChildId: Instance | TextInstance | SuspenseInstance
    ) {
      send({
        type: MessageType.INSERT_IN_CONTAINER_BEFORE,
        payload: {
          containerId,
          childId,
          beforeChildId,
        },
      })
    },

    removeChild(
      parentId: Instance,
      childId: Instance | TextInstance | SuspenseInstance
    ) {
      send({
        type: MessageType.REMOVE_CHILD,
        payload: {
          parentId,
          childId,
        },
      })
    },

    removeChildFromContainer(
      containerId: Container,
      childId: Instance | TextInstance | SuspenseInstance
    ) {
      send({
        type: MessageType.REMOVE_CHILD_FROM_CONTAINER,
        payload: {
          containerId,
          childId,
        },
      })
    },

    resetTextContent(_instance: Instance) {},

    commitTextUpdate(
      _textInstance: TextInstance,
      _oldText: string,
      _newText: string
    ) {},

    commitMount(
      _instance: Instance,
      _type: Type,
      _props: Props,
      _internalInstanceHandle: OpaqueHandle
    ) {},

    commitUpdate(
      instanceId: Instance,
      _updatePayload: UpdatePayload,
      _type: Type,
      prevProps: Props,
      nextProps: Props,
      _internalHandle: OpaqueHandle
    ) {
      // TODO: Could probably send a diff of the props rather than both.
      send({
        type: MessageType.COMMIT_UPDATE,
        payload: {
          instanceId,
          prevProps: filterProps(prevProps),
          nextProps: filterProps(nextProps),
        },
      })
    },

    hideInstance(instanceId: Instance) {
      send({
        type: MessageType.HIDE_INSTANCE,
        payload: {
          instanceId,
        },
      })
    },

    hideTextInstance(_textInstance: TextInstance) {},

    unhideInstance(instanceId: Instance, props: Props) {
      send({
        type: MessageType.UNHIDE_INSTANCE,
        payload: {
          instanceId,
          props: filterProps(props),
        },
      })
    },

    unhideTextInstance(_textInstance: TextInstance, _text: string) {},

    clearContainer(containerId: Container) {
      send({
        type: MessageType.CLEAR_CONTAINER,
        payload: {
          containerId,
        },
      })
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
> =>
  new Promise(resolve => {
    const ws = new WebSocket(host)
    ws.on('open', () => resolve(generateHostConfig(ws)))
  })

export default createHostConfig
