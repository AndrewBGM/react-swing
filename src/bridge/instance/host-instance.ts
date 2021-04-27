import Instance from './instance'

class HostInstance extends Instance {
  constructor(readonly id: number) {
    super(id)
  }
}

export default HostInstance
