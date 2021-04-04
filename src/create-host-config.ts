import { performance } from 'perf_hooks'
import { HostConfig, OpaqueHandle } from 'react-reconciler'
import ReactSwingClient from './client'

const filterProps = (
  props: Record<string, unknown>,
): Record<string, unknown> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, ...rest } = props
  return rest
}

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

const createHostConfig = (
  client: ReactSwingClient,
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
  let nextInstanceId = 1
  const getNextInstanceId = () => {
    const instanceId = nextInstanceId
    nextInstanceId += 1

    return instanceId
  }

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
      const instanceId = getNextInstanceId()
      client.send('CREATE_INSTANCE', {
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
      const instanceId = getNextInstanceId()
      client.send('CREATE_TEXT_INSTANCE', {
        instanceId,
        text,
      })

      return instanceId
    },

    appendInitialChild(
      parentId: HostInstance,
      childId: HostInstance | HostTextInstance,
    ) {
      client.send('APPEND_INITIAL_CHILD', {
        parentId,
        childId,
      })
    },

    finalizeInitialChildren(
      instanceId: HostInstance,
      type: HostType,
      props: HostProps,
      _rootContainer: HostContainer,
      _hostContext: HostContext,
    ): boolean {
      client.send('FINALIZE_INITIAL_CHILDREN', {
        instanceId,
        type,
        props: filterProps(props),
      })

      return true
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
      client.send('APPEND_CHILD', {
        parentId,
        childId,
      })
    },

    appendChildToContainer(
      containerId: HostContainer,
      childId: HostInstance | HostTextInstance,
    ) {
      client.send('APPEND_CHILD_TO_CONTAINER', {
        containerId,
        childId,
      })
    },

    insertBefore(
      parentId: HostInstance,
      childId: HostInstance | HostTextInstance,
      beforeChildId: HostInstance | HostTextInstance | HostSuspenseInstance,
    ) {
      client.send('INSERT_BEFORE', {
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
      client.send('INSERT_IN_CONTAINER_BEFORE', {
        containerId,
        childId,
        beforeChildId,
      })
    },

    removeChild(
      parentId: HostInstance,
      childId: HostInstance | HostTextInstance | HostSuspenseInstance,
    ) {
      client.send('REMOVE_CHILD', {
        parentId,
        childId,
      })
    },

    removeChildFromContainer(
      containerId: HostContainer,
      childId: HostInstance | HostTextInstance | HostSuspenseInstance,
    ) {
      client.send('REMOVE_CHILD_FROM_CONTAINER', {
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
      client.send('COMMIT_TEXT_UPDATE', {
        instanceId,
        oldText,
        newText,
      })
    },

    commitMount(
      instanceId: HostInstance,
      type: HostType,
      props: HostProps,
      _internalInstanceHandle: OpaqueHandle,
    ) {
      client.send('COMMIT_MOUNT', {
        instanceId,
        type,
        props: filterProps(props),
      })
    },

    commitUpdate(
      instanceId: HostInstance,
      _updatePayload: HostUpdatePayload,
      type: HostType,
      prevProps: HostProps,
      nextProps: HostProps,
      _internalHandle: OpaqueHandle,
    ) {
      client.send('COMMIT_UPDATE', {
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
      client.send('CLEAR_CONTAINER', {
        containerId,
      })
    },
  }
}

export default createHostConfig
