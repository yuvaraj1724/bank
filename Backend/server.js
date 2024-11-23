require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

// Connect to MongoDB
const { connectToMongoose } = require("./config/db");

// Middlewares
// Express JSON parser middleware
app.use(express.json());

// CORS middleware
const { corsProOptions } = require("./config/corsConfig");
app.use(cors(corsProOptions));

// Rate limiting middleware for API calls
const { apiLimiter } = require("./middlewares/rateLimitMiddleware/rateLimitMiddleware");
app.use("/api", apiLimiter);

// Users router
const usersRoute = require("./routes/usersRoutes");
app.use("/api/users", usersRoute);

// Admins router
const adminsRoute = require("./routes/adminRoutes");
app.use("/api/admins", adminsRoute);

// Account router
const accountRoute = require("./routes/accountRoutes");
app.use("/api/account", accountRoute);

// Account request router
const accountRequestRoute = require("./routes/accountRequestRoutes");
app.use("/api/request", accountRequestRoute);

// Serve Frontend (in production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../", "Frontend", "dist", "index.html"))
  );
}

// Connect to MongoDB and start the server
connectToMongoose()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.log("Error:", err);
  });
