const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { getMigrationStatus, runMigrations } = require("../src/db/migrator");

function mockPool(appliedVersions = []) {
  const calls = [];
  const client = {
    async query(text, values = []) {
      calls.push({ text, values });
      if (text.includes("SELECT version FROM schema_migrations")) {
        return { rows: appliedVersions.map((version) => ({ version })) };
      }
      return { rows: [] };
    },
    release() {},
  };
  return { calls, connect: async () => client };
}

const migrationsDir = path.resolve(__dirname, "../migrations");

test("migration runner applies pending migrations once", async () => {
  const pool = mockPool();
  const applied = await runMigrations({ pool, migrationsDir });
  assert.deepEqual(applied, ["001_initial_schema.sql"]);
  assert.equal(pool.calls.filter((call) => call.text.includes("INSERT INTO schema_migrations")).length, 1);
  assert.ok(pool.calls.some((call) => call.text === "COMMIT"));
});

test("migration runner skips completed migrations", async () => {
  const pool = mockPool(["001_initial_schema.sql"]);
  const applied = await runMigrations({ pool, migrationsDir });
  assert.deepEqual(applied, []);
  assert.equal(pool.calls.filter((call) => call.text.includes("INSERT INTO schema_migrations")).length, 0);
});

test("migration status reports applied state", async () => {
  const pool = mockPool(["001_initial_schema.sql"]);
  assert.deepEqual(await getMigrationStatus({ pool, migrationsDir }), [
    { version: "001_initial_schema.sql", applied: true },
  ]);
});