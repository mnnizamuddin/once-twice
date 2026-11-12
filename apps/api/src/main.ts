import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

const DEFAULT_PORT = 3001;

/**
 * Starts the API. Shutdown hooks let modules close their resources
 * (database connections) when the process stops.
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? DEFAULT_PORT);
}

await bootstrap();
