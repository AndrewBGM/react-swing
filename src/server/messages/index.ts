import { AppendChildMessage } from './append-child'
import { AppendChildToContainerMessage } from './append-child-to-container'
import { AppendInitialChildMessage } from './append-initial-child'
import { ClearContainerMessage } from './clear-container'
import { CommitUpdateMessage } from './commit-update'
import { CreateInstanceMessage } from './create-instance'
import { HideInstanceMessage } from './hide-instance'
import { InsertBeforeMessage } from './insert-before'
import { InsertInContainerBeforeMessage } from './insert-in-container-before'
import { InvokeCallbackMessage } from './invoke-callback-message'
import { RemoveChildMessage } from './remove-child'
import { RemoveChildFromContainerMessage } from './remove-child-from-container'
import { UnhideInstanceMessage } from './unhide-instance'

export * from './append-child'
export * from './append-child-to-container'
export * from './append-initial-child'
export * from './clear-container'
export * from './commit-update'
export * from './create-instance'
export * from './hide-instance'
export * from './insert-before'
export * from './insert-in-container-before'
export * from './invoke-callback-message'
export * from './remove-child'
export * from './remove-child-from-container'
export * from './unhide-instance'

export type Message =
  | AppendChildMessage
  | AppendChildToContainerMessage
  | AppendInitialChildMessage
  | ClearContainerMessage
  | CommitUpdateMessage
  | CreateInstanceMessage
  | HideInstanceMessage
  | InsertBeforeMessage
  | InsertInContainerBeforeMessage
  | InvokeCallbackMessage
  | RemoveChildMessage
  | RemoveChildFromContainerMessage
  | UnhideInstanceMessage
