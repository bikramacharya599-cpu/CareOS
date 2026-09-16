const { Pool } = require("pg");
const config = require("./env");

const pool = config.databaseUrl
  ? new Pool({
      connectionString: config.databaseUrl,
      ssl: config.databaseSsl
        ? { rejectUnauthorized: config.databaseSslRejectUnauthorized }
        : false,
    })
  : null;

async function checkDatabaseHealth() {
  if (!pool) {
    return { ok: false, configured: false };
  }

  try {
    await pool.query("SELECT 1");
    return { ok: true, configured: true };
  } catch (error) {
    return { ok: false, configured: true };
  }
}

async function closeDatabase() {
  if (pool) await pool.end();
}

module.exports = { pool, checkDatabaseHealth, closeDatabase };
