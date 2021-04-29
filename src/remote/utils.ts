import { Client } from '../client'
import Remote from './remote'

// eslint-disable-next-line import/prefer-default-export
export const configureRemote = (client: Client): Remote => ({
  host: client.host,

  send: data => client.send(data),
})
