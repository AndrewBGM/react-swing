class InstanceManager {
  private nextId = 1

  create(_type: string, _props: Record<string, unknown>): number {
    const id = this.nextId
    this.nextId += 1
    return id
  }

  createText(_text: string): number {
    const id = this.nextId
    this.nextId += 1
    return id
  }
}

export default InstanceManager
