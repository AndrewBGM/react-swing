package io.github.andrewbgm.reactswingserver

import com.google.gson.GsonBuilder
import io.github.andrewbgm.reactswingserver.message.MessageAdapter
import io.github.andrewbgm.reactswingserver.message.AppendChildMessage
import io.github.andrewbgm.reactswingserver.message.AppendChildToContainerMessage
import io.github.andrewbgm.reactswingserver.message.AppendInitialChildMessage
import io.github.andrewbgm.reactswingserver.message.ClearContainerMessage
import io.github.andrewbgm.reactswingserver.message.CommitUpdateMessage
import io.github.andrewbgm.reactswingserver.message.CreateInstanceMessage
import io.github.andrewbgm.reactswingserver.message.HideInstanceMessage
import io.github.andrewbgm.reactswingserver.message.IMessage
import io.github.andrewbgm.reactswingserver.message.InsertBeforeMessage
import io.github.andrewbgm.reactswingserver.message.InsertInContainerBeforeMessage
import io.github.andrewbgm.reactswingserver.message.RemoveChildFromContainerMessage
import io.github.andrewbgm.reactswingserver.message.RemoveChildMessage
import io.github.andrewbgm.reactswingserver.message.UnhideInstanceMessage
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
    configureGson()

    return Javalin.create()
      .ws("/ws") { ws ->
        ws.onMessage {
          val message = it.message<IMessage>()
          logger.info(message.toString())
        }
      }
  }

  private fun configureGson() {
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
      ): String = gson.toJson(obj)
    }
  }
}
