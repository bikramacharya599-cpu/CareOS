const express = require("express");
const { checkDatabaseHealth } = require("../config/database");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ service: "careos-api", status: "ok", mode: "demo", timestamp: new Date().toISOString() });
});

router.get("/db", async (req, res, next) => {
  try {
    const health = await checkDatabaseHealth();
    res.status(health.ok ? 200 : 503).json({
      status: health.ok ? "ok" : "error",
      database: health.ok ? "connected" : "unavailable",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
