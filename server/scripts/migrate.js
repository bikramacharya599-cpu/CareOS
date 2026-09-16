const path = require("node:path");
const { pool } = require("../src/config/database");
const { getMigrationStatus, runMigrations } = require("../src/db/migrator");

async function main() {
  if (!pool) {
    throw new Error("DATABASE_URL is not configured; refusing to run database commands.");
  }

  const migrationsDir = path.resolve(__dirname, "../migrations");
  if (process.argv.includes("--status")) {
    const status = await getMigrationStatus({ pool, migrationsDir });
    status.forEach((migration) => console.log(`${migration.applied ? "applied" : "pending"} ${migration.version}`));
  } else {
    const applied = await runMigrations({ pool, migrationsDir });
    console.log(applied.length ? `Applied ${applied.length} migration(s).` : "No pending migrations.");
  }
}

main()
  .catch(() => {
    console.error("CareOS database command failed.");
    process.exitCode = 1;
  })
  .finally(async () => {
    if (pool) await pool.end();
  });