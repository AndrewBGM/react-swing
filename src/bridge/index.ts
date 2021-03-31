import WebSocket from 'ws'
import CallbackMapper from './callback-mapper'

const filterProps = <P extends Record<string, unknown>>(props: P): P => ({
  ...props,
  children: undefined,
})

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
export type Callback = (...args: unknown[]) => unknown

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
    })
  }

  createInstance(
    _type: Type,
    _props: Props,
    _rootContainer: Container,
    _hostContext: HostContext,
    _internalHandle: OpaqueHandle
  ): Instance {
    throw new Error('Host instances are not supported.')
  }

  createTextInstance(
    _text: string,
    _rootContainer: Container,
    _hostContext: HostContext,
    _internalHandle: OpaqueHandle
  ): TextInstance {
    throw new Error('Text instances are not supported.')
  }

  appendInitialChild(
    _parentId: Instance,
    _childId: Instance | TextInstance
  ): void {}

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

  resetAfterCommit(_containerInfo: Container): void {}

  preparePortalMount(_containerInfo: Container): void {}

  appendChild(_parentId: Instance, _childId: Instance | TextInstance): void {}

  appendChildToContainer(
    _containerId: Container,
    _childId: Instance | TextInstance
  ): void {}

  insertBefore(
    _parentId: Instance,
    _childId: Instance | TextInstance,
    _beforeChildId: Instance | TextInstance | SuspenseInstance
  ): void {}

  insertInContainerBefore(
    _containerId: Container,
    _childId: Instance | TextInstance,
    _beforeChildId: Instance | TextInstance | SuspenseInstance
  ): void {}

  removeChild(
    _parentId: Instance,
    _childId: Instance | TextInstance | SuspenseInstance
  ): void {}

  removeChildFromContainer(
    _containerId: Container,
    _childId: Instance | TextInstance | SuspenseInstance
  ): void {}

  resetTextContent(_instance: Instance): void {}

  commitTextUpdate(
    _textInstance: TextInstance,
    _oldText: string,
    _newText: string
  ): void {}

  commitMount(
    _instance: Instance,
    _type: Type,
    _props: Props,
    _internalInstanceHandle: OpaqueHandle
  ): void {}

  commitUpdate(
    _instanceId: Instance,
    _updatePayload: UpdatePayload,
    _type: Type,
    _prevProps: Props,
    _nextProps: Props,
    _internalHandle: OpaqueHandle
  ): void {}

  hideInstance(_instanceId: Instance): void {}

  hideTextInstance(_textInstance: TextInstance): void {}

  unhideInstance(instanceId: Instance, props: Props): void {
    this.send({
      type: 'UNHIDE_INSTANCE',
      payload: {
        instanceId,
        props: filterProps(props),
      },
    })
  }

  unhideTextInstance(textInstance: TextInstance, text: string): void {
    this.send({
      type: 'UNHIDE_TEXT_INSTANCE',
      payload: {
        textInstance,
        text,
      },
    })
  }

  clearContainer(_containerId: Container): void {}

  private send(obj: Record<string, unknown>) {
    this.ws.send(JSON.stringify(this.callbackMapper.map(obj)))
  }
}

export const configureBridge = async (host: string): Promise<Bridge> => {
  const bridge = new Bridge(host)
  await bridge.connect()

  return bridge
}
