export interface DatabaseConfig {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: unknown;
  dialect: string;
  timezone: string;
}

const {
  POSTGRES_USER,
  POSTGRES_PASS,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
} = process.env;

export const databaseConfig: DatabaseConfig = {
  username: POSTGRES_USER,
  password: POSTGRES_PASS,
  database: POSTGRES_DB,
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  dialect: "postgres",
  timezone: "+00:00"
};

console.log('ccccccccccc', databaseConfig)
