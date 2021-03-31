import WebSocket from 'ws'
import CallbackMapper from './callback-mapper'
import { Message, MessageType } from './messages'

const filterProps = <P extends Record<string, unknown>>(
  props: P
): Omit<P, 'children'> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, ...rest } = props
  return rest
}

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

export class Bridge {
  private callbackMapper = new CallbackMapper()

  private ws!: WebSocket

  private nextInstanceId = 1

  private rootHostContext: HostContext = {}

  constructor(private host: string) {}

  connect(): Promise<void> {
    return new Promise(resolve => {
      this.ws = new WebSocket(this.host)
      this.ws.once('open', () => resolve())
      this.ws.on('ping', data => this.ws.pong(data))
    })
  }

  createInstance(
    type: Type,
    props: Props,
    _rootContainer: Container,
    _hostContext: HostContext,
    _internalHandle: OpaqueHandle
  ): Instance {
    const instanceId = this.getNextInstanceId()
    this.send({
      type: MessageType.CREATE_INSTANCE,
      payload: {
        instanceId,
        type,
        props: filterProps(props),
      },
    })

    return instanceId
  }

  createTextInstance(
    text: string,
    _rootContainer: Container,
    _hostContext: HostContext,
    _internalHandle: OpaqueHandle
  ): TextInstance {
    const instanceId = this.getNextInstanceId()
    this.send({
      type: MessageType.CREATE_TEXT_INSTANCE,
      payload: {
        instanceId,
        text,
      },
    })

    return instanceId
  }

  appendInitialChild(
    parentId: Instance,
    childId: Instance | TextInstance
  ): void {
    this.send({
      type: MessageType.APPEND_INITIAL_CHILD,
      payload: {
        parentId,
        childId,
      },
    })
  }

  finalizeInitialChildren(
    _instance: Instance,
    _type: Type,
    _props: Props,
    _rootContainer: Container,
    _hostContext: HostContext
  ): boolean {
    return false
  }

  prepareUpdate(
    _instance: Instance,
    _type: Type,
    _oldProps: Props,
    _newProps: Props,
    _rootContainer: Container,
    _hostContext: HostContext
  ): UpdatePayload | null {
    return null
  }

  shouldSetTextContent(_type: Type, _props: Props): boolean {
    return false
  }

  getRootHostContext(_rootContainer: Container): HostContext | null {
    return this.rootHostContext
  }

  getChildHostContext(
    parentHostContext: HostContext,
    _type: Type,
    _rootContainer: Container
  ): HostContext {
    return parentHostContext
  }

  getPublicInstance(instance: Instance | TextInstance): PublicInstance {
    return instance
  }

  prepareForCommit(_containerInfo: Container): Record<string, unknown> | null {
    return null
  }

  resetAfterCommit(containerInfo: Container): void {
    this.send({
      type: MessageType.RESET_AFTER_COMMIT,
      payload: {
        containerInfo,
      },
    })
  }

  preparePortalMount(containerInfo: Container): void {
    this.send({
      type: MessageType.PREPARE_PORTAL_MOUNT,
      payload: {
        containerInfo,
      },
    })
  }

  appendChild(parentId: Instance, childId: Instance | TextInstance): void {
    this.send({
      type: MessageType.APPEND_CHILD,
      payload: {
        parentId,
        childId,
      },
    })
  }

  appendChildToContainer(
    containerId: Container,
    childId: Instance | TextInstance
  ): void {
    this.send({
      type: MessageType.APPEND_CHILD_TO_CONTAINER,
      payload: {
        containerId,
        childId,
      },
    })
  }

  insertBefore(
    parentId: Instance,
    childId: Instance | TextInstance,
    beforeChildId: Instance | TextInstance | SuspenseInstance
  ): void {
    this.send({
      type: MessageType.INSERT_BEFORE,
      payload: {
        parentId,
        childId,
        beforeChildId,
      },
    })
  }

  insertInContainerBefore(
    containerId: Container,
    childId: Instance | TextInstance,
    beforeChildId: Instance | TextInstance | SuspenseInstance
  ): void {
    this.send({
      type: MessageType.INSERT_IN_CONTAINER_BEFORE,
      payload: {
        containerId,
        childId,
        beforeChildId,
      },
    })
  }

  removeChild(
    parentId: Instance,
    childId: Instance | TextInstance | SuspenseInstance
  ): void {
    this.send({
      type: MessageType.REMOVE_CHILD,
      payload: {
        parentId,
        childId,
      },
    })
  }

  removeChildFromContainer(
    containerId: Container,
    childId: Instance | TextInstance | SuspenseInstance
  ): void {
    this.send({
      type: MessageType.REMOVE_CHILD_FROM_CONTAINER,
      payload: {
        containerId,
        childId,
      },
    })
  }

  resetTextContent(instance: Instance): void {
    this.send({
      type: MessageType.RESET_TEXT_CONTENT,
      payload: {
        instance,
      },
    })
  }

  commitTextUpdate(
    textInstance: TextInstance,
    oldText: string,
    newText: string
  ): void {
    this.send({
      type: MessageType.COMMIT_TEXT_UPDATE,
      payload: {
        textInstance,
        oldText,
        newText,
      },
    })
  }

  commitMount(
    instance: Instance,
    type: Type,
    props: Props,
    _internalInstanceHandle: OpaqueHandle
  ): void {
    this.send({
      type: MessageType.COMMIT_MOUNT,
      payload: {
        instance,
        type,
        props: filterProps(props),
      },
    })
  }

  commitUpdate(
    instanceId: Instance,
    _updatePayload: UpdatePayload,
    type: Type,
    prevProps: Props,
    nextProps: Props,
    _internalHandle: OpaqueHandle
  ): void {
    this.send({
      type: MessageType.COMMIT_UPDATE,
      payload: {
        instanceId,
        type,
        prevProps: filterProps(prevProps),
        nextProps: filterProps(nextProps),
      },
    })
  }

  hideInstance(instanceId: Instance): void {
    this.send({
      type: MessageType.HIDE_INSTANCE,
      payload: {
        instanceId,
      },
    })
  }

  hideTextInstance(textInstance: TextInstance): void {
    this.send({
      type: MessageType.HIDE_TEXT_INSTANCE,
      payload: {
        textInstance,
      },
    })
  }

  unhideInstance(instanceId: Instance, props: Props): void {
    this.send({
      type: MessageType.UNHIDE_INSTANCE,
      payload: {
        instanceId,
        props: filterProps(props),
      },
    })
  }

  unhideTextInstance(textInstance: TextInstance, text: string): void {
    this.send({
      type: MessageType.UNHIDE_TEXT_INSTANCE,
      payload: {
        textInstance,
        text,
      },
    })
  }

  clearContainer(containerId: Container): void {
    this.send({
      type: MessageType.CLEAR_CONTAINER,
      payload: {
        containerId,
      },
    })
  }

  private send(message: Message) {
    // TODO: Don't like how this is done.
    this.ws.send(JSON.stringify(this.callbackMapper.map(message)))
  }

  private getNextInstanceId(): number {
    const instanceId = this.nextInstanceId
    this.nextInstanceId += 1

    return instanceId
  }
}

export const configureBridge = async (host: string): Promise<Bridge> => {
  const bridge = new Bridge(host)
  await bridge.connect()

  return bridge
}
