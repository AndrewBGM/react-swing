export type Callback = (...args: unknown[]) => unknown

const isCallback = (arg: unknown): arg is Callback => typeof arg === 'function'

const isObject = (arg: unknown): arg is Record<string, unknown> =>
  Object.prototype.toString.call(arg) === '[Object object]'

class CallbackMapper {
  private nextCallbackId = 1

  private callbacksById: Record<number, Callback | undefined> = {}

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
          this.callbacksById[callbackId] = value
          this.nextCallbackId += 1

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

export default CallbackMapper
