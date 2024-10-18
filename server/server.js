const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// Use CORS middleware
app.use(cors()); // Enables CORS for all routes

// Parse JSON request bodies
app.use(express.json());

// Mocked saveData endpoint
app.post("/api/saveData", (req, res) => {
  console.log("Received data:", req.body);

  // Mock a success response
  res.json({
    message: "Data saved successfully",
    id: Math.floor(Math.random() * 1000), // Mocked ID
  });
});

// Fallback for 404 errors
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// Start the server on port 9000
app.listen(9000, () => {
  console.log("Server running on port 9000");
});
