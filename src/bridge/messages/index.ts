import AppendChildMessage from './append-child'
import AppendChildToContainerMessage from './append-child-to-container'
import AppendInitialChildMessage from './append-initial-child'
import ClearContainerMessage from './clear-container'
import CommitTextUpdateMessage from './commit-text-update'
import CommitUpdateMessage from './commit-update'
import CreateInstanceMessage from './create-instance'
import CreateTextInstanceMessage from './create-text-instance'
import HideInstanceMessage from './hide-instance'
import HideTextInstanceMessage from './hide-text-instance'
import InsertBeforeMessage from './insert-before'
import InsertInContainerBeforeMessage from './insert-in-container-before'
import MessageType from './message-type'
import RemoveChildMessage from './remove-child'
import RemoveChildFromContainerMessage from './remove-child-from-container'
import UnhideInstanceMessage from './unhide-instance'
import UnhideTextInstanceMessage from './unhide-text-instance'
import UserDefinedMessage from './user-defined'

export * from './append-child'
export type { default as AppendChildMessage } from './append-child'
export * from './append-child-to-container'
export type { default as AppendChildToContainerMessage } from './append-child-to-container'
export * from './append-initial-child'
export type { default as AppendInitialChildMessage } from './append-initial-child'
export * from './clear-container'
export type { default as ClearContainerMessage } from './clear-container'
export * from './commit-text-update'
export type { default as CommitTextUpdateMessage } from './commit-text-update'
export * from './commit-update'
export type { default as CommitUpdateMessage } from './commit-update'
export * from './create-instance'
export type { default as CreateInstanceMessage } from './create-instance'
export * from './create-text-instance'
export type { default as CreateTextInstanceMessage } from './create-text-instance'
export * from './hide-instance'
export type { default as HideInstanceMessage } from './hide-instance'
export * from './hide-text-instance'
export type { default as HideTextInstanceMessage } from './hide-text-instance'
export * from './insert-before'
export type { default as InsertBeforeMessage } from './insert-before'
export * from './insert-in-container-before'
export type { default as InsertInContainerBeforeMessage } from './insert-in-container-before'
export { default as MessageType } from './message-type'
export * from './remove-child'
export type { default as RemoveChildMessage } from './remove-child'
export * from './remove-child-from-container'
export type { default as RemoveChildFromContainerMessage } from './remove-child-from-container'
export * from './unhide-instance'
export type { default as UnhideInstanceMessage } from './unhide-instance'
export * from './unhide-text-instance'
export type { default as UnhideTextInstanceMessage } from './unhide-text-instance'
export * from './user-defined'
export type { default as UserDefinedMessage } from './user-defined'

export type Message =
  | AppendChildToContainerMessage
  | AppendChildMessage
  | AppendInitialChildMessage
  | ClearContainerMessage
  | CommitTextUpdateMessage
  | CommitUpdateMessage
  | CreateInstanceMessage
  | CreateTextInstanceMessage
  | HideInstanceMessage
  | HideTextInstanceMessage
  | InsertBeforeMessage
  | InsertInContainerBeforeMessage
  | RemoveChildMessage
  | RemoveChildFromContainerMessage
  | UnhideInstanceMessage
  | UnhideTextInstanceMessage
  | UserDefinedMessage

type MessagesByType = {
  [T in Message as T['type']]: T['payload']
}

export type MessagePayload<T extends MessageType> = MessagesByType[T]
