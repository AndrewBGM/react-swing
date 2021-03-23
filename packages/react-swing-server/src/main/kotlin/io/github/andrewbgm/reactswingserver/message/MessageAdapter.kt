package io.github.andrewbgm.reactswingserver.message

import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import com.google.gson.JsonNull
import com.google.gson.JsonObject
import com.google.gson.JsonSerializationContext
import com.google.gson.JsonSerializer
import java.lang.reflect.Type
import kotlin.reflect.KClass

class MessageAdapter(
  vararg messages: KClass<out IMessage>,
) : JsonDeserializer<IMessage>, JsonSerializer<IMessage> {
  private val mappedNamesByType: MutableMap<KClass<out IMessage>, String> = mutableMapOf()
  private val mappedTypesByName: MutableMap<String, KClass<out IMessage>> = mutableMapOf()

  init {
    messages.forEach { registerMessageType(it) }
  }

  override fun deserialize(
    json: JsonElement,
    typeOfT: Type,
    ctx: JsonDeserializationContext,
  ): IMessage? {
    if (!json.isJsonObject) {
      return null
    }

    val obj = json.asJsonObject
    val type = obj.get("type").asString
    val payload = obj.getAsJsonPrimitive("payload")
    val mappedType = mappedTypesByName[type] ?: error("No mapping exists for $type")

    return ctx.deserialize(payload, mappedType.java)
  }

  override fun serialize(
    src: IMessage?,
    typeOfSrc: Type,
    ctx: JsonSerializationContext,
  ): JsonElement {
    if (src == null) {
      return JsonNull.INSTANCE
    }

    val mappedName = mappedNamesByType[src::class] ?: error("No mapping exists for ${src::class}")
    val obj = JsonObject()
    obj.addProperty("type", mappedName)
    obj.add("payload", ctx.serialize(src))
    return obj
  }

  private fun registerMessageType(
    type: KClass<out IMessage>,
  ) {
    val name = convertTypeToName(type)

    mappedNamesByType[type] = name
    mappedTypesByName[name] = type
  }

  private fun convertTypeToName(
    type: KClass<*>,
  ): String = Regex("[A-Z]").split(type.simpleName!!)
    .dropLast(1)
    .joinToString("_") { it.toUpperCase() }
}
