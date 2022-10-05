import getenv from "getenv";
import type { ClientConfig, Client } from "pg";
import pkg from "pg";
const { Client: PgClient } = pkg;

export const createClient = (option: ClientConfig): Client => {
  return new PgClient({
    host: getenv("TWIHIKA_POSTGRES_HOST"),
    port: getenv.int("TWIHIKA_POSTGRES_PORT"),
    database: getenv("TWIHIKA_POSTGRES_DATABASE"),
    user: getenv("TWIHIKA_POSTGRES_USER"),
    password: getenv("TWIHIKA_POSTGRES_PASSWORD"),
    ssl: { rejectUnauthorized: false },
    ...option,
  });
};
