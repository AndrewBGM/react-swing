package io.github.andrewbgm.reactswingserver.message

import com.google.gson.annotations.Expose

data class InsertInContainerBeforeMessage(
  @Expose val containerId: Int,
  @Expose val childId: Int,
  @Expose val beforeChildId: Int,
) : IMessage
