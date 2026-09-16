const express = require("express");
const cors = require("cors");
const config = require("./config/env");
const createApiRouter = require("./routes");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

function createApp() {
  const app = express();
  app.disable("x-powered-by");
  app.use(cors({ origin: config.corsOrigin }));
  app.use(express.json({ limit: "100kb" }));
  app.get("/", (req, res) => res.json({ service: "careos-api", status: "ok", message: "CareOS API is running in demo mode." }));
  app.use("/api", createApiRouter());
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}

module.exports = { createApp };
