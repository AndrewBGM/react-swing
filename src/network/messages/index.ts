import { default as AppendChildMessage } from './append-child'
import { default as AppendChildToContainerMessage } from './append-child-to-container'
import { default as AppendInitialChildMessage } from './append-initial-child'
import { default as ClearContainerMessage } from './clear-container'
import { default as CommitUpdateMessage } from './commit-update'
import { default as CreateInstanceMessage } from './create-instance'
import { default as HideInstanceMessage } from './hide-instance'
import { default as InsertBeforeMessage } from './insert-before'
import { default as InsertInContainerBeforeMessage } from './insert-in-container-before'
import { default as InvokeCallbackMessage } from './invoke-callback'
import { default as RemoveChildMessage } from './remove-child'
import { default as RemoveChildFromContainerMessage } from './remove-child-from-container'
import { default as UnhideInstanceMessage } from './unhide-instance'

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
