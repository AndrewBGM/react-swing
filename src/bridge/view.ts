class BridgeView {
  private callbacks: Record<string, CallableFunction | undefined> = {}

  private children: BridgeView[] = []

  constructor(readonly id: string) {}

  appendChild(child: BridgeView): void {
    this.children.push(child)
  }

  removeChild(child: BridgeView): void {
    const idx = this.children.indexOf(child)
    if (idx >= 0) {
      this.children.splice(idx, 1)
    }
  }

  insertBefore(child: BridgeView, beforeChild: BridgeView): void {
    const childIdx = this.children.indexOf(child)
    if (childIdx >= 0) {
      this.children.splice(childIdx, 1)
    }

    const beforeChildIdx = this.children.indexOf(beforeChild)
    this.children.splice(beforeChildIdx, 0, child)
  }

  syncCallbacks(props: Record<string, unknown>): void {
    const keys = new Set([
      ...Object.keys(this.callbacks),
      ...Object.keys(props),
    ])

    keys.forEach(key => {
      if (key in props) {
        const value = props[key]
        if (typeof value === 'function') {
          this.callbacks[key] = value
        } else delete this.callbacks[key]
      }
    })
  }

  invokeCallback(name: string, args: unknown[]): void {
    const cb = this.callbacks[name]
    if (!cb) {
      return
    }

    cb(...args)
  }

  clearCallbacks(): void {
    this.callbacks = {}
  }

  getChildren(): BridgeView[] {
    return this.children.slice()
  }
}

export default BridgeView
