plugins {
  kotlin("jvm") version "1.4.31"

  `java-library`
  `maven-publish`
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

publishing {
  publications {
    create<MavenPublication>("default") {
      from(components["java"])
    }
  }

  repositories {
    maven {
      name = "GitHubPackages"
      url = uri("https://maven.pkg.github.com/andrewbgm/react-swing")
      credentials {
        username = System.getenv("GITHUB_ACTOR")
        password = System.getenv("GITHUB_TOKEN")
      }
    }
  }
}
