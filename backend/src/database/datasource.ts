import 'dotenv/config'
import { join } from 'path'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { DataSource } from 'typeorm'

const base: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  // https://docs.nestjs.com/techniques/database#auto-load-entities
  synchronize: false, // do not automatically sync entities
  // js for runtime, ts for typeorm cli
  entities: [join(__dirname, 'entities', '*.entity{.js,.ts}')],
  // ref: https://github.com/typeorm/typeorm/issues/3388 to set pool size
  extra: {
    max: process.env.DB_MAX_POOL,
    idleTimeoutMillis: 10 * 60 * 1000,
    keepAlive: true,
  },
  namingStrategy: new SnakeNamingStrategy(),
}

export const config: PostgresConnectionOptions = {
  ...base,
  migrations: [join(__dirname, 'migrations', '*{.js,.ts}')],
}

// For CLI migrations.
// TypeORM Module instantiates its own datasource which should be injected as necessary.
export const appDataSource = new DataSource(config)
