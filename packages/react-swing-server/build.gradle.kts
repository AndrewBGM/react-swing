plugins {
  kotlin("jvm") version "1.4.31"

  `java-library`
}

repositories {
  mavenCentral()
}

dependencies {
  implementation(platform(kotlin("bom")))
  implementation(kotlin("stdlib-jdk8"))
  // implementation(kotlin("reflect"))

  // implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.4.2")
  // implementation("org.jetbrains.kotlinx:kotlinx-coroutines-swing:1.4.2")

  implementation("org.slf4j:slf4j-simple:1.7.30")
  implementation("com.google.code.gson:gson:2.8.6")
  implementation("io.javalin:javalin:3.13.4")

  testImplementation(kotlin("test"))
  testImplementation(kotlin("test-junit"))
}
