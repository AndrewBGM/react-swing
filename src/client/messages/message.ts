import AppendChildMessage from './append-child'
import AppendChildToContainerMessage from './append-child-to-container'
import AppendInitialChildMessage from './append-initial-child'
import ClearContainerMessage from './clear-container'
import CommitTextUpdateMessage from './commit-text-update'
import CommitUpdateMessage from './commit-update'
import CreateInstanceMessage from './create-instance'
import CreateTextInstanceMessage from './create-text-instance'
import InsertBeforeMessage from './insert-before'
import InsertInContainerBeforeMessage from './insert-in-container-before'
import RemoveChildMessage from './remove-child'
import RemoveChildFromContainerMessage from './remove-child-from-container'

type Message =
  | AppendChildToContainerMessage
  | AppendChildMessage
  | AppendInitialChildMessage
  | ClearContainerMessage
  | CommitTextUpdateMessage
  | CommitUpdateMessage
  | CreateInstanceMessage
  | CreateTextInstanceMessage
  | InsertBeforeMessage
  | InsertInContainerBeforeMessage
  | RemoveChildFromContainerMessage
  | RemoveChildMessage

export default Message
