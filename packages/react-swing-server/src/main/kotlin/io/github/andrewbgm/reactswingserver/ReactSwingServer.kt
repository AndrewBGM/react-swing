package io.github.andrewbgm.reactswingserver

import com.google.gson.GsonBuilder
import io.github.andrewbgm.reactswingserver.message.AppendChildMessage
import io.github.andrewbgm.reactswingserver.message.IMessage
import io.github.andrewbgm.reactswingserver.message.MessageAdapter
import io.javalin.*
import io.javalin.plugin.json.*
import kotlin.reflect.KClass

// TODO: This belongs somewhere, but I'm not sure it's here.
private val defaultMessageMappings: Array<Pair<String, KClass<out IMessage>>> = arrayOf(
  "APPEND_CHILD" to AppendChildMessage::class
)

class ReactSwingServer {
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
      .ws("/ws") {

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
