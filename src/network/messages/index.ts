import AppendChildMessage from './append-child'
import AppendChildToContainerMessage from './append-child-to-container'
import AppendInitialChildMessage from './append-initial-child'
import ClearContainerMessage from './clear-container'
import CommitUpdateMessage from './commit-update'
import CreateInstanceMessage from './create-instance'
import HideInstanceMessage from './hide-instance'
import InsertBeforeMessage from './insert-before'
import InsertInContainerBeforeMessage from './insert-in-container-before'
import InvokeCallbackMessage from './invoke-callback'
import RemoveChildMessage from './remove-child'
import RemoveChildFromContainerMessage from './remove-child-from-container'
import UnhideInstanceMessage from './unhide-instance'

export { default as MessageType } from './message-type'

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
