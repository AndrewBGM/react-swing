interface Remote {
  host: string

  send: (type: string, payload: Record<string, unknown>) => void
}

export default Remote
