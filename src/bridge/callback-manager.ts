export interface CachedCallback {
  id: number

  invoke: CallableFunction
}

class CallbackManager {
  private nextCallbackId = 1

  private cachedCallbacks: CachedCallback[] = []

  invoke(id: number, args: unknown[] = []): void {
    const rc = this.cachedCallbacks.find(x => x.id === id)
    rc?.invoke(...args)
  }

  free(id: number): void {
    const idx = this.cachedCallbacks.findIndex(x => x.id === id)
    if (idx >= 0) {
      this.cachedCallbacks.splice(idx, 1)
    }
  }

  fromCache(invoke: CallableFunction): number {
    const idx = this.cachedCallbacks.findIndex(rc => rc.invoke === invoke)
    if (idx >= 0) {
      return idx
    }

    const id = this.nextCallbackId
    this.nextCallbackId += 1
    this.cachedCallbacks.push({
      id,
      invoke,
    })

    return id
  }
}

export default CallbackManager
