
const express = require("express");

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to DSA Studio API",
    status: "running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "DSA Studio backend is healthy",
  });
});

app.listen(PORT, () => {
  console.log(`DSA Studio API running at http://localhost:${PORT}`);
});
