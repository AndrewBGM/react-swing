package io.github.andrewbgm.reactswingserver.messages

import com.google.gson.annotations.Expose

data class UnhideInstanceMessage(
  @Expose val instanceId: Int,
) : IMessage
