interface CachedCallbacks {
  id: number

  invoke: CallableFunction
}

class CallbackManager {
  private nextId = 1

  private callbacks: CachedCallbacks[] = []

  getOrCache(invoke: CallableFunction): number {
    const existing = this.callbacks.find(x => x.invoke === invoke)
    if (existing) {
      return existing.id
    }

    const id = this.nextId
    this.nextId += 1

    this.callbacks.push({
      id,
      invoke,
    })

    return id
  }

  free(id: number): void {
    const idx = this.callbacks.findIndex(x => x.id === id)
    if (idx >= 0) {
      this.callbacks.splice(idx, 1)
    }
  }

  invoke(id: number, args: unknown[]): void {
    const callback = this.callbacks.find(x => x.id === id)
    if (callback) {
      callback.invoke(...args)
    }
  }
}

export default CallbackManager
