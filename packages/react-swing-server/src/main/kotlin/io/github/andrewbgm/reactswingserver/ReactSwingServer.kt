package io.github.andrewbgm.reactswingserver

import com.google.gson.GsonBuilder
import io.github.andrewbgm.reactswingserver.messages.AppendChildMessage
import io.github.andrewbgm.reactswingserver.messages.AppendChildToContainerMessage
import io.github.andrewbgm.reactswingserver.messages.AppendInitialChildMessage
import io.github.andrewbgm.reactswingserver.messages.ClearContainerMessage
import io.github.andrewbgm.reactswingserver.messages.CommitUpdateMessage
import io.github.andrewbgm.reactswingserver.messages.CreateInstanceMessage
import io.github.andrewbgm.reactswingserver.messages.HideInstanceMessage
import io.github.andrewbgm.reactswingserver.messages.IMessage
import io.github.andrewbgm.reactswingserver.messages.InsertBeforeMessage
import io.github.andrewbgm.reactswingserver.messages.InsertInContainerBeforeMessage
import io.github.andrewbgm.reactswingserver.gson.MessageAdapter
import io.github.andrewbgm.reactswingserver.messages.RemoveChildFromContainerMessage
import io.github.andrewbgm.reactswingserver.messages.RemoveChildMessage
import io.github.andrewbgm.reactswingserver.messages.UnhideInstanceMessage
import io.javalin.*
import io.javalin.plugin.json.*
import org.slf4j.LoggerFactory
import kotlin.reflect.KClass

// TODO: This belongs somewhere, but I'm not sure it's here.
private val defaultMessageMappings: Array<Pair<String, KClass<out IMessage>>> = arrayOf(
  "APPEND_CHILD" to AppendChildMessage::class,
  "APPEND_CHILD_TO_CONTAINER" to AppendChildToContainerMessage::class,
  "APPEND_INITIAL_CHILD" to AppendInitialChildMessage::class,
  "CLEAR_CONTAINER" to ClearContainerMessage::class,
  "COMMIT_UPDATE" to CommitUpdateMessage::class,
  "CREATE_INSTANCE" to CreateInstanceMessage::class,
  "HIDE_INSTANCE" to HideInstanceMessage::class,
  "INSERT_BEFORE" to InsertBeforeMessage::class,
  "INSERT_IN_CONTAINER_BEFORE" to InsertInContainerBeforeMessage::class,
  "REMOVE_CHILD_FROM_CONTAINER" to RemoveChildFromContainerMessage::class,
  "REMOVE_CHILD" to RemoveChildMessage::class,
  "UNHIDE_INSTANCE" to UnhideInstanceMessage::class
)

class ReactSwingServer {
  private val logger = LoggerFactory.getLogger(ReactSwingServer::class.java)

  private val app: Javalin by lazy { configureApp() }

  fun start(
    port: Int,
  ) {
    app.start(port)
  }

  fun stop() {
    app.stop()
  }

  private fun configureApp(): Javalin {
    configureJsonMapping()

    return Javalin.create()
      .ws("/ws") { ws ->
        ws.onConnect {
          logger.info("Connection received")
        }

        ws.onMessage {
          val message = it.message<IMessage>()
          logger.info(message.toString())
        }

        ws.onClose {
          logger.info("Connection closed")
        }

        ws.onError {
          logger.info("Error: ${it.error()}")
        }
      }
  }

  private fun configureJsonMapping() {
    val gson = GsonBuilder()
      .excludeFieldsWithoutExposeAnnotation()
      .registerTypeAdapter(IMessage::class.java, MessageAdapter(*defaultMessageMappings))
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
