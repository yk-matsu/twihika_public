import * as getenv from 'getenv'
import { Client, ClientConfig } from "pg"


export const createClient = (option: ClientConfig): Client => {
  return new Client({
    host: getenv('TWIHIKA_POSTGRES_HOST'),
    port: getenv.int('TWIHIKA_POSTGRES_PORT'),
    database: getenv('TWIHIKA_POSTGRES_DATABASE'),
    user: getenv('TWIHIKA_POSTGRES_USER'),
    password: getenv('TWIHIKA_POSTGRES_PASSWORD'),
    // ssl: { rejectUnauthorized: false },
    // ssl: true,
    ...option
  })
}