const globalErrorHandler = (err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
};

export default globalErrorHandler;
