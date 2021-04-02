import { performance } from 'perf_hooks'
import { HostConfig, OpaqueHandle } from 'react-reconciler'
import RPCClient from './rpc-client'

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

const creatInstanceIdFactory = () => {
  let nextInstanceId = 1
  return () => {
    const instanceId = nextInstanceId
    nextInstanceId += 1

    return instanceId
  }
}

const createHostConfig = (
  rpc: RPCClient,
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
  const createInstanceId = creatInstanceIdFactory()
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
      rpc.send('createTextInstance', {
        instanceId,
        type,
        props,
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
      rpc.send('createTextInstance', {
        instanceId,
        text,
      })

      return instanceId
    },

    appendInitialChild(
      parentId: HostInstance,
      childId: HostInstance | HostTextInstance,
    ) {
      rpc.send('appendInitialChild', {
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

    resetAfterCommit(_containerInfo: HostContainer) {},

    preparePortalMount(_containerInfo: HostContainer) {},

    appendChild(
      parentId: HostInstance,
      childId: HostInstance | HostTextInstance,
    ) {
      rpc.send('appendChild', {
        parentId,
        childId,
      })
    },

    appendChildToContainer(
      containerId: HostContainer,
      childId: HostInstance | HostTextInstance,
    ) {
      rpc.send('appendChildToContainer', {
        containerId,
        childId,
      })
    },

    insertBefore(
      parentId: HostInstance,
      childId: HostInstance | HostTextInstance,
      beforeChildId: HostInstance | HostTextInstance | HostSuspenseInstance,
    ) {
      rpc.send('insertBefore', {
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
      rpc.send('insertInContainerBefore', {
        containerId,
        childId,
        beforeChildId,
      })
    },

    removeChild(
      parentId: HostInstance,
      childId: HostInstance | HostTextInstance | HostSuspenseInstance,
    ) {
      rpc.send('removeChild', {
        parentId,
        childId,
      })
    },

    removeChildFromContainer(
      containerId: HostContainer,
      childId: HostInstance | HostTextInstance | HostSuspenseInstance,
    ) {
      rpc.send('removeChildFromContainer', {
        containerId,
        childId,
      })
    },

    resetTextContent(_instance: HostInstance) {},

    commitTextUpdate(
      _textInstance: HostTextInstance,
      _oldText: string,
      _newText: string,
    ) {},

    commitMount(
      _instance: HostInstance,
      _type: HostType,
      _props: HostProps,
      _internalInstanceHandle: OpaqueHandle,
    ) {},

    commitUpdate(
      instanceId: HostInstance,
      _updatePayload: HostUpdatePayload,
      type: HostType,
      prevProps: HostProps,
      nextProps: HostProps,
      _internalHandle: OpaqueHandle,
    ) {
      rpc.send('commitUpdate', {
        instanceId,
        type,
        prevProps,
        nextProps,
      })
    },

    hideInstance(_instanceId: HostInstance) {},

    hideTextInstance(_textInstance: HostTextInstance) {},

    unhideInstance(_instanceId: HostInstance, _props: HostProps) {},

    unhideTextInstance(_textInstance: HostTextInstance, _text: string) {},

    clearContainer(containerId: HostContainer) {
      rpc.send('clearContainer', {
        containerId,
      })
    },
  }
}

export default createHostConfig
