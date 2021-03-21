package io.github.andrewbgm.reactswingserver.messages

import com.google.gson.annotations.Expose

data class AppendChildMessage(
  @Expose val parentId: Int,
  @Expose val childId: Int,
) : IMessage
