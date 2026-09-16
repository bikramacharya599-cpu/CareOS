const { Pool } = require("pg");
const config = require("./env");

const pool = config.databaseUrl
  ? new Pool({
      connectionString: config.databaseUrl,
      ssl: config.databaseSsl ? { rejectUnauthorized: false } : false,
    })
  : null;

async function checkDatabaseHealth() {
  if (!pool) {
    return { ok: false, configured: false, message: "DATABASE_URL is not configured." };
  }

  try {
    await pool.query("SELECT 1");
    return { ok: true, configured: true, message: "PostgreSQL connection is healthy." };
  } catch (error) {
    return { ok: false, configured: true, message: "PostgreSQL connection failed." };
  }
}

async function closeDatabase() {
  if (pool) await pool.end();
}

module.exports = { pool, checkDatabaseHealth, closeDatabase };
