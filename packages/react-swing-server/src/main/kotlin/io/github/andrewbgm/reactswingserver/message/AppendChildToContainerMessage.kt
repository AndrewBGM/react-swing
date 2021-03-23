package io.github.andrewbgm.reactswingserver.message

import com.google.gson.annotations.Expose

data class AppendChildToContainerMessage(
  @Expose val containerId: Int,
  @Expose val childId: Int,
) : IMessage
