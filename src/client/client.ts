import WebSocket from 'ws'
import { CommitUpdateMessagePayload, MessagePayload } from './messages'
import { shallowDiff, withoutChildren } from './utils'

export type UpdatePayload = Omit<CommitUpdateMessagePayload, 'instanceId'>

class Client {
  private nextInstanceId = 1

  constructor(readonly host: string, readonly ws: WebSocket) {}

  createInstance(type: string, props: Record<string, unknown>): number {
    const instanceId = this.nextInstanceId
    this.nextInstanceId += 1

    this.send('CREATE_INSTANCE', {
      instanceId,
      type,
      props: withoutChildren(props),
    })

    return instanceId
  }

  createTextInstance(text: string): number {
    const instanceId = this.nextInstanceId
    this.nextInstanceId += 1

    this.send('CREATE_TEXT_INSTANCE', {
      instanceId,
      text,
    })

    return instanceId
  }

  appendInitialChild(parentId: number, childId: number): void {
    this.send('APPEND_INITIAL_CHILD', {
      parentId,
      childId,
    })
  }

  prepareUpdate(
    oldProps: Record<string, unknown>,
    newProps: Record<string, unknown>,
  ): UpdatePayload | null {
    const patchedOldProps = withoutChildren(oldProps)
    const patchedNewProps = withoutChildren(newProps)
    const diff = shallowDiff(patchedOldProps, patchedNewProps)
    const needsUpdate = Object.keys(diff).length > 0

    if (!needsUpdate) {
      return null
    }

    return {
      oldProps: patchedOldProps,
      newProps: patchedNewProps,
    }
  }

  appendChild(parentId: number, childId: number): void {
    this.send('APPEND_CHILD', {
      parentId,
      childId,
    })
  }

  appendChildToContainer(parentId: number, childId: number): void {
    this.send('APPEND_CHILD_TO_CONTAINER', {
      parentId,
      childId,
    })
  }

  insertBefore(parentId: number, childId: number, beforeChildId: number): void {
    this.send('INSERT_BEFORE', {
      parentId,
      childId,
      beforeChildId,
    })
  }

  insertInContainerBefore(
    parentId: number,
    childId: number,
    beforeChildId: number,
  ): void {
    this.send('INSERT_IN_CONTAINER_BEFORE', {
      parentId,
      childId,
      beforeChildId,
    })
  }

  removeChild(parentId: number, childId: number): void {
    this.send('REMOVE_CHILD', {
      childId,
      parentId,
    })
  }

  removeChildFromContainer(parentId: number, childId: number): void {
    this.send('REMOVE_CHILD_FROM_CONTAINER', {
      childId,
      parentId,
    })
  }

  commitTextUpdate(instanceId: number, oldText: string, newText: string): void {
    this.send('COMMIT_TEXT_UPDATE', {
      instanceId,
      oldText,
      newText,
    })
  }

  commitUpdate(instanceId: number, updatePayload: UpdatePayload): void {
    this.send('COMMIT_UPDATE', {
      instanceId,
      ...updatePayload,
    })
  }

  clearContainer(instanceId: number): void {
    this.send('CLEAR_CONTAINER', {
      instanceId,
    })
  }

  send<T extends string>(type: T, payload: MessagePayload<T>): void {
    this.ws.send(
      JSON.stringify({
        type,
        payload,
      }),
    )
  }
}

export const configureClient = (host: string): Promise<Client> =>
  new Promise((resolve, reject) => {
    const ws = new WebSocket(host)
    ws.once('open', () => resolve(new Client(host, ws)))
    ws.once('error', err => reject(err))
  })

export default Client
