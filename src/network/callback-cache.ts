type Callback = (...args: unknown[]) => unknown

const isCallback = (arg: unknown): arg is Callback => typeof arg === 'function'

const isObject = (arg: unknown): arg is Record<string, unknown> =>
  typeof arg === 'object' && arg !== null

class CallbackCache {
  private nextCallbackId = 1

  private mappedCallbacksById: Record<number, Callback | undefined> = {}

  map<T extends unknown>(obj: T): T {
    if (Array.isArray(obj)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return obj.map(x => this.map(x)) as T
    }

    if (isObject(obj)) {
      return Object.keys(obj).reduce((current, key) => {
        const value = obj[key]

        if (isCallback(value)) {
          const callbackId = this.nextCallbackId
          this.nextCallbackId += 1
          this.mappedCallbacksById[callbackId] = value

          return {
            ...current,
            [key]: callbackId,
          }
        }

        return {
          ...current,
          [key]: this.map(value),
        }
      }, {}) as T
    }

    return obj
  }
}

export default CallbackCache
