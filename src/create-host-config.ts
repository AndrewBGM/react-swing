import { performance } from 'perf_hooks'
import { HostConfig, OpaqueHandle } from 'react-reconciler'
import WebSocket from 'ws'

export type HostType = string
export type HostProps = Record<string, unknown>
export type HostContainer = number
export type HostInstance = number
export type HostTextInstance = number
export type HostSuspenseInstance = number
export type HostHydratableInstance = number
export type HostPublicInstance = number
export type HostContext = Record<string, unknown>
export type HostUpdatePayload = Record<string, unknown>
export type HostChildSet = unknown
export type HostTimeoutHandle = NodeJS.Timeout
export type HostNoTimeout = -1

const createInstanceIdFactory = () => {
  let nextInstanceId = 1
  return () => {
    const instanceId = nextInstanceId
    nextInstanceId += 1

    return instanceId
  }
}

const filterProps = (props: HostProps): HostProps => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, ...rest } = props
  if (typeof children === 'string' || typeof children === 'number') {
    return {
      ...rest,
      children: String(children),
    }
  }

  return rest
}

const sendMessage = (
  ws: WebSocket,
  type: string,
  payload: Record<string, unknown>,
) =>
  ws.send(
    JSON.stringify({
      type,
      payload,
    }),
  )

const createHostConfig = (
  ws: WebSocket,
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
> => {
  const createInstanceId = createInstanceIdFactory()
  const rootHostContext: HostContext = {}

  return {
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
      const instanceId = createInstanceId()
      sendMessage(ws, 'CREATE_INSTANCE', {
        instanceId,
        type,
        props: filterProps(props),
      })

      return instanceId
    },

    createTextInstance(
      text: string,
      _rootContainer: HostContainer,
      _hostContext: HostContext,
      _internalHandle: OpaqueHandle,
    ): HostTextInstance {
      const instanceId = createInstanceId()
      sendMessage(ws, 'CREATE_TEXT_INSTANCE', {
        instanceId,
        text,
      })

      return instanceId
    },

    appendInitialChild(
      parentId: HostInstance,
      childId: HostInstance | HostTextInstance,
    ) {
      sendMessage(ws, 'APPEND_CHILD', {
        parentId,
        childId,
      })
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
      return rootHostContext
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
      sendMessage(ws, 'APPEND_CHILD', {
        parentId,
        childId,
      })
    },

    appendChildToContainer(
      containerId: HostContainer,
      childId: HostInstance | HostTextInstance,
    ) {
      sendMessage(ws, 'APPEND_CHILD_TO_CONTAINER', {
        containerId,
        childId,
      })
    },

    insertBefore(
      parentId: HostInstance,
      childId: HostInstance | HostTextInstance,
      beforeChildId: HostInstance | HostTextInstance | HostSuspenseInstance,
    ) {
      sendMessage(ws, 'INSERT_BEFORE', {
        parentId,
        childId,
        beforeChildId,
      })
    },

    insertInContainerBefore(
      containerId: HostContainer,
      childId: HostInstance | HostTextInstance,
      beforeChildId: HostInstance | HostTextInstance | HostSuspenseInstance,
    ) {
      sendMessage(ws, 'INSERT_IN_CONTAINER_BEFORE', {
        containerId,
        childId,
        beforeChildId,
      })
    },

    removeChild(
      parentId: HostInstance,
      childId: HostInstance | HostTextInstance | HostSuspenseInstance,
    ) {
      sendMessage(ws, 'REMOVE_CHILD', {
        parentId,
        childId,
      })
    },

    removeChildFromContainer(
      containerId: HostContainer,
      childId: HostInstance | HostTextInstance | HostSuspenseInstance,
    ) {
      sendMessage(ws, 'REMOVE_CHILD_FROM_CONTAINER', {
        containerId,
        childId,
      })
    },

    resetTextContent(_instanceId: HostInstance) {
      throw new Error('Not yet implemented')
    },

    commitTextUpdate(
      instanceId: HostTextInstance,
      oldText: string,
      newText: string,
    ) {
      sendMessage(ws, 'COMMIT_TEXT_UPDATE', {
        instanceId,
        oldText,
        newText,
      })
    },

    commitMount(
      _instance: HostInstance,
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
      sendMessage(ws, 'COMMIT_UPDATE', {
        instanceId,
        type,
        prevProps: filterProps(prevProps),
        nextProps: filterProps(nextProps),
      })
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
      sendMessage(ws, 'CLEAR_CONTAINER', {
        containerId,
      })
    },
  }
}

export default createHostConfig
