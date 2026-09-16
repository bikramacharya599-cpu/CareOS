const { createApp } = require("./app");
const config = require("./config/env");
const { closeDatabase } = require("./config/database");

const server = createApp().listen(config.port, () => {
  console.log(`CareOS API listening on http://localhost:${config.port} (${config.nodeEnv}, demo mode)`);
});

async function shutdown(signal) {
  console.log(`Received ${signal}; closing CareOS API.`);
  server.close(async () => {
    await closeDatabase();
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
