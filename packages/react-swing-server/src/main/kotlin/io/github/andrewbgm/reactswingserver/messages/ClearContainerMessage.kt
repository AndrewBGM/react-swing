package io.github.andrewbgm.reactswingserver.messages

import com.google.gson.annotations.Expose

data class ClearContainerMessage(
  @Expose val containerId: Int,
) : IMessage
