function notFoundHandler(req, res) {
  res.status(404).json({ error: "Route not found", path: req.originalUrl });
}

function errorHandler(error, req, res, next) {
  console.error(`[CareOS API] ${error.message}`);
  if (res.headersSent) return next(error);
  res.status(error.statusCode || 500).json({
    error: "CareOS API request failed.",
    message: process.env.NODE_ENV === "production" ? undefined : error.message,
  });
}

module.exports = { notFoundHandler, errorHandler };
