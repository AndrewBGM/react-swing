package io.github.andrewbgm.reactswingserver.message

import com.google.gson.GsonBuilder
import com.google.gson.annotations.Expose
import kotlin.test.Test
import kotlin.test.expect

class MessageAdapterTest {
  private data class MessageAdapterTestMessage(
    @Expose val value: String,
  ) : IMessage

  private val gson = GsonBuilder()
    .excludeFieldsWithoutExposeAnnotation()
    .registerTypeAdapter(IMessage::class.java, MessageAdapter(
      MessageAdapterTestMessage::class
    ))
    .create()

  private val json = """{"type":"MESSAGE_ADAPTER_TEST","payload":{"value":"test"}}"""

  @Test
  fun fromJson() {
    val result = gson.fromJson<MessageAdapterTestMessage>(json, IMessage::class.java)
    expect(MessageAdapterTestMessage::class) { result::class }
    expect("test") { result.value }
  }

  @Test
  fun toJson() {
    val result = gson.toJson(MessageAdapterTestMessage("test"), IMessage::class.java)
    expect(json) { result }
  }
}
