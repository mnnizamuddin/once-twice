import { Controller, Get, Inject } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import { DATABASE, type Database } from '../database/database.module';

/** Answer of the health check. */
export interface Health {
  status: 'ok';
  database: 'up';
}

/**
 * Tells whether the API is running and can reach the database.
 * Used by the hosting platform and by monitoring.
 */
@Controller('health')
export class HealthController {
  constructor(@Inject(DATABASE) private readonly database: Database) {}

  @Get()
  async check(): Promise<Health> {
    await this.database.execute(sql`SELECT 1`);
    return { status: 'ok', database: 'up' };
  }
}
