export enum MessageType {
  CREATE_INSTANCE = 'CREATE_INSTANCE',
  CREATE_TEXT_INSTANCE = 'CREATE_TEXT_INSTANCE',
  APPEND_INITIAL_CHILD = 'APPEND_INITIAL_CHILD',
  RESET_AFTER_COMMIT = 'RESET_AFTER_COMMIT',
  PREPARE_PORTAL_MOUNT = 'PREPARE_PORTAL_MOUNT',
  APPEND_CHILD = 'APPEND_CHILD',
  APPEND_CHILD_TO_CONTAINER = 'APPEND_CHILD_TO_CONTAINER',
  INSERT_BEFORE = 'INSERT_BEFORE',
  INSERT_IN_CONTAINER_BEFORE = 'INSERT_IN_CONTAINER_BEFORE',
  REMOVE_CHILD = 'REMOVE_CHILD',
  REMOVE_CHILD_FROM_CONTAINER = 'REMOVE_CHILD_FROM_CONTAINER',
  RESET_TEXT_CONTENT = 'RESET_TEXT_CONTENT',
  COMMIT_TEXT_UPDATE = 'COMMIT_TEXT_UPDATE',
  COMMIT_MOUNT = 'COMMIT_MOUNT',
  COMMIT_UPDATE = 'COMMIT_UPDATE',
  HIDE_INSTANCE = 'HIDE_INSTANCE',
  HIDE_TEXT_INSTANCE = 'HIDE_TEXT_INSTANCE',
  UNHIDE_INSTANCE = 'UNHIDE_INSTANCE',
  UNHIDE_TEXT_INSTANCE = 'UNHIDE_TEXT_INSTANCE',
  CLEAR_CONTAINER = 'CLEAR_CONTAINER',
}

export interface CreateInstanceMessage {
  type: MessageType.CREATE_INSTANCE
  payload: {
    instanceId: number
    type: string
    props: Record<string, unknown>
  }
}

export interface CreateTextInstanceMessage {
  type: MessageType.CREATE_TEXT_INSTANCE
  payload: {
    instanceId: number
    text: string
  }
}

export interface AppendInitialChildMessage {
  type: MessageType.APPEND_INITIAL_CHILD
  payload: {
    parentId: number
    childId: number
  }
}

export interface ResetAfterCommitMessage {
  type: MessageType.RESET_AFTER_COMMIT
  payload: {
    containerInfo: number
  }
}

export interface PreparePortalMountMessage {
  type: MessageType.PREPARE_PORTAL_MOUNT
  payload: {
    containerInfo: number
  }
}

export interface AppendChildMessage {
  type: MessageType.APPEND_CHILD
  payload: {
    parentId: number
    childId: number
  }
}

export interface AppendChildToContainerMessage {
  type: MessageType.APPEND_CHILD_TO_CONTAINER
  payload: {
    containerId: number
    childId: number
  }
}

export interface InsertBeforeMessage {
  type: MessageType.INSERT_BEFORE
  payload: {
    parentId: number
    childId: number
    beforeChildId: number
  }
}

export interface InsertInContainerBeforeMessage {
  type: MessageType.INSERT_IN_CONTAINER_BEFORE
  payload: {
    containerId: number
    childId: number
    beforeChildId: number
  }
}

export interface RemoveChildMessage {
  type: MessageType.REMOVE_CHILD
  payload: {
    parentId: number
    childId: number
  }
}
export interface RemoveChildFromContainerMessage {
  type: MessageType.REMOVE_CHILD_FROM_CONTAINER
  payload: {
    containerId: number
    childId: number
  }
}

export interface ResetTextContentMessage {
  type: MessageType.RESET_TEXT_CONTENT
  payload: {
    instance: number
  }
}

export interface CommitTextUpdateMessage {
  type: MessageType.COMMIT_TEXT_UPDATE
  payload: {
    textInstance: number
    oldText: string
    newText: string
  }
}

export interface CommitMountMessage {
  type: MessageType.COMMIT_MOUNT
  payload: {
    instance: number
    type: string
    props: Record<string, unknown>
  }
}

export interface CommitUpdateMessage {
  type: MessageType.COMMIT_UPDATE
  payload: {
    instanceId: number
    type: string
    prevProps: Record<string, unknown>
    nextProps: Record<string, unknown>
  }
}

export interface HideInstanceMessage {
  type: MessageType.HIDE_INSTANCE
  payload: {
    instanceId: number
  }
}

export interface HideTextInstanceMessage {
  type: MessageType.HIDE_TEXT_INSTANCE
  payload: {
    textInstance: number
  }
}

export interface UnhideInstanceMessage {
  type: MessageType.UNHIDE_INSTANCE
  payload: {
    instanceId: number
    props: Record<string, unknown>
  }
}

export interface UnhideTextInstanceMessage {
  type: MessageType.UNHIDE_TEXT_INSTANCE
  payload: {
    textInstance: number
    text: string
  }
}

export interface ClearContainerMessage {
  type: MessageType.CLEAR_CONTAINER
  payload: {
    containerId: number
  }
}

export type Message =
  | CreateInstanceMessage
  | CreateTextInstanceMessage
  | AppendInitialChildMessage
  | ResetAfterCommitMessage
  | PreparePortalMountMessage
  | AppendChildMessage
  | AppendChildToContainerMessage
  | InsertBeforeMessage
  | InsertInContainerBeforeMessage
  | RemoveChildMessage
  | RemoveChildFromContainerMessage
  | ResetTextContentMessage
  | CommitTextUpdateMessage
  | CommitMountMessage
  | CommitUpdateMessage
  | HideInstanceMessage
  | HideTextInstanceMessage
  | UnhideInstanceMessage
  | UnhideTextInstanceMessage
  | ClearContainerMessage
