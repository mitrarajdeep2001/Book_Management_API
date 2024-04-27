const express = require("express");
const connectDB = require("./Database/config"); // Import the connectDB function
const authRoutes = require("./Routes/auth");
const bookRoutes = require("./Routes/book");

async function main() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware
  app.use(express.json());

  try {
    // MongoDB connection
    await connectDB();
    console.log("MongoDB connected");

    // Routes
    app.use("/", async (req, res) => {
      res.send("Welcome! to my book management API.");
    });
    app.use("/auth", authRoutes);
    app.use("/book", bookRoutes);

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
}

// Call the main function to start the server
main();
