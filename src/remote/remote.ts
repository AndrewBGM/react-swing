interface Remote {
  host: string

  send: (data: Record<string, unknown>) => void
}

export default Remote
