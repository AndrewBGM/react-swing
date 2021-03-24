package io.github.andrewbgm.reactswingserver

import com.google.gson.GsonBuilder
import io.github.andrewbgm.reactswingserver.message.*
import io.javalin.*
import io.javalin.plugin.json.*
import org.slf4j.LoggerFactory

class ReactSwingServer {
  private val logger = LoggerFactory.getLogger(ReactSwingServer::class.java)

  private val app: Javalin by lazy { createServer() }

  fun start(
    port: Int,
  ) {
    app.start(port)
  }

  fun stop() {
    app.stop()
  }

  private fun createServer(): Javalin {
    configureMessageMapper()

    return Javalin.create()
      .ws("/ws") { ws ->
        ws.onMessage {
          val message = it.message<IMessage>()
          logger.info(message.toString())
        }
      }
  }

  private fun configureMessageMapper() {
    val gson = GsonBuilder()
      .excludeFieldsWithoutExposeAnnotation()
      .registerTypeAdapter(IMessage::class.java, MessageAdapter(
        AppendChildMessage::class,
        AppendChildToContainerMessage::class,
        AppendInitialChildMessage::class,
        ClearContainerMessage::class,
        CommitUpdateMessage::class,
        CreateInstanceMessage::class,
        HideInstanceMessage::class,
        InsertBeforeMessage::class,
        InsertInContainerBeforeMessage::class,
        RemoveChildFromContainerMessage::class,
        RemoveChildMessage::class,
        UnhideInstanceMessage::class
      ))
      .create()

    JavalinJson.fromJsonMapper = object : FromJsonMapper {
      override fun <T> map(
        json: String,
        targetClass: Class<T>,
      ) = gson.fromJson(json, targetClass)
    }

    JavalinJson.toJsonMapper = object : ToJsonMapper {
      override fun map(
        obj: Any,
      ): String = if (obj is IMessage) gson.toJson(obj, IMessage::class.java) else gson.toJson(obj)
    }
  }
}
