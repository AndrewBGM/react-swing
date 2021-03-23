package io.github.andrewbgm.reactswingserver.message

import com.google.gson.annotations.Expose

data class HideInstanceMessage(
  @Expose val instanceId: Int,
) : IMessage
