const path = require("node:path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.API_PORT || 3001),
  databaseUrl: process.env.DATABASE_URL || "",
  databaseSsl: process.env.DATABASE_SSL === "true",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
};
