const fs = require("node:fs/promises");
const path = require("node:path");

const MIGRATION_LOCK_KEY = 782451;

async function loadMigrations(migrationsDir) {
  const files = (await fs.readdir(migrationsDir))
    .filter((file) => /^\d+_.+\.sql$/.test(file))
    .sort();

  return Promise.all(files.map(async (file) => ({
    name: file,
    sql: await fs.readFile(path.join(migrationsDir, file), "utf8"),
  })));
}

async function ensureMigrationsTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `);
}

async function getAppliedMigrations(client) {
  const result = await client.query("SELECT version FROM schema_migrations ORDER BY version");
  return new Set(result.rows.map((row) => row.version));
}

async function getMigrationStatus({ pool, migrationsDir }) {
  const client = await pool.connect();
  try {
    await ensureMigrationsTable(client);
    const migrations = await loadMigrations(migrationsDir);
    const applied = await getAppliedMigrations(client);
    return migrations.map((migration) => ({
      version: migration.name,
      applied: applied.has(migration.name),
    }));
  } finally {
    client.release();
  }
}

async function runMigrations({ pool, migrationsDir }) {
  const migrations = await loadMigrations(migrationsDir);
  const client = await pool.connect();
  const applied = [];

  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock($1)", [MIGRATION_LOCK_KEY]);
    await ensureMigrationsTable(client);
    const completed = await getAppliedMigrations(client);

    for (const migration of migrations) {
      if (completed.has(migration.name)) continue;
      await client.query(migration.sql);
      await client.query("INSERT INTO schema_migrations (version) VALUES ($1)", [migration.name]);
      applied.push(migration.name);
    }

    await client.query("COMMIT");
    return applied;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

module.exports = { loadMigrations, getMigrationStatus, runMigrations };