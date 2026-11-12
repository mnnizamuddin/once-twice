/**
 * Starts a local PostgreSQL server for development, without Docker
 * and without admin rights, thanks to the embedded-postgres package.
 *
 * Data is kept in `apps/api/.pgdata` between runs.
 * Stop the server with Ctrl+C.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import EmbeddedPostgres from 'embedded-postgres';

const PORT = 54329;
const USER = 'postgres';
const PASSWORD = 'postgres';
const DATABASE = 'once_twice';

const apiDirectory = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dataDirectory = path.join(apiDirectory, '.pgdata');

const server = new EmbeddedPostgres({
  databaseDir: dataDirectory,
  user: USER,
  password: PASSWORD,
  port: PORT,
  persistent: true,
});

/**
 * Creates the data directory the first time only.
 */
async function initialiseOnce() {
  if (existsSync(dataDirectory)) {
    return;
  }
  await server.initialise();
}

/**
 * Creates the application database if it does not exist yet.
 */
async function createDatabaseOnce() {
  const client = server.getPgClient();
  await client.connect();
  const result = await client.query(
    'SELECT 1 FROM pg_database WHERE datname = $1',
    [DATABASE],
  );
  if (result.rowCount === 0) {
    await client.query(`CREATE DATABASE ${DATABASE}`);
  }
  await client.end();
}

/**
 * Stops the server cleanly when the process is interrupted.
 */
function stopOnInterrupt() {
  process.on('SIGINT', async () => {
    await server.stop();
    process.exit(0);
  });
}

await initialiseOnce();
await server.start();
await createDatabaseOnce();
stopOnInterrupt();

console.log(
  `PostgreSQL is ready: postgres://${USER}:${PASSWORD}@localhost:${PORT}/${DATABASE}`,
);
console.log('Press Ctrl+C to stop it.');
