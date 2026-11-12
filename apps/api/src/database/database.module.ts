import {
  Global,
  Inject,
  Injectable,
  Module,
  type OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

/** Injection token of the Drizzle client. */
export const DATABASE = Symbol('DATABASE');

/** Injection token of the PostgreSQL connection pool. */
const POOL = Symbol('POOL');

/** Drizzle client typed with the application schema. */
export type Database = NodePgDatabase<typeof schema>;

/**
 * Closes the connection pool when the application stops,
 * so that no connection stays open.
 */
@Injectable()
class PoolCloser implements OnApplicationShutdown {
  constructor(@Inject(POOL) private readonly pool: Pool) {}

  async onApplicationShutdown(): Promise<void> {
    await this.pool.end();
  }
}

/**
 * Provides the Drizzle client to every module, under the DATABASE token.
 */
@Global()
@Module({
  providers: [
    {
      provide: POOL,
      inject: [ConfigService],
      useFactory: (config: ConfigService): Pool =>
        new Pool({
          connectionString: config.getOrThrow<string>('DATABASE_URL'),
        }),
    },
    {
      provide: DATABASE,
      inject: [POOL],
      useFactory: (pool: Pool): Database => drizzle(pool, { schema }),
    },
    PoolCloser,
  ],
  exports: [DATABASE],
})
export class DatabaseModule {}
