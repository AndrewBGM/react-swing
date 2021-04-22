import AppendChildMessage from './append-child'
import ClearContainerMessage from './clear-container'
import CommitTextUpdateMessage from './commit-text-update'
import CommitUpdateMessage from './commit-update'
import CreateInstanceMessage from './create-instance'
import CreateTextInstanceMessage from './create-text-instance'
import FreeCallbackMessage from './free-callback'
import InsertBeforeMessage from './insert-before'
import InvokeCallbackMessage from './invoke-callback'
import RemoveChildMessage from './remove-child'

export * from './append-child'
export type { default as AppendChildMessage } from './append-child'
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
export * from './free-callback'
export type { default as FreeCallbackMessage } from './free-callback'
export * from './insert-before'
export type { default as InsertBeforeMessage } from './insert-before'
export * from './invoke-callback'
export type { default as InvokeCallbackMessage } from './invoke-callback'
export * from './remove-child'
export type { default as RemoveChildMessage } from './remove-child'

export type Message =
  | AppendChildMessage
  | ClearContainerMessage
  | CommitTextUpdateMessage
  | CommitUpdateMessage
  | CreateInstanceMessage
  | CreateTextInstanceMessage
  | FreeCallbackMessage
  | InsertBeforeMessage
  | InvokeCallbackMessage
  | RemoveChildMessage

export const decodeMessage = (data: string): Message =>
  JSON.parse(data) as Message

export const encodeMessage = (message: Message): string =>
  JSON.stringify(message)
