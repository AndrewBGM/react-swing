interface Remote {
  host: string
}

export const buildRemote = (host: string): Remote => ({
  host,
})

export default Remote
