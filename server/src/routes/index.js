const express = require("express");
const healthRoutes = require("./health");

function createApiRouter() {
  const router = express.Router();
  router.use("/health", healthRoutes);

  ["employees", "clients", "shifts", "evv", "billing", "audit"].forEach((resource) => {
    router.get(`/${resource}`, (req, res) => {
      res.status(501).json({ resource, status: "demo-only", message: "This resource API is reserved for the secure backend phase." });
    });
  });

  return router;
}

module.exports = createApiRouter;
