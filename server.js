const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const dbConnect = require("./config/dbConnect");

// Route imports
const userRoutes = require("./routes/userRoutes");

const app = express();

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to MongoDB
dbConnect();

// Development logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// JSON body parser
app.use(express.json());

// Health check
app.use("/health", (req, res) => {
    res.status(200).json({ success: true, status: 200, message: "Server is running" });
});

// Route middleware
app.use("/api/v1/users", userRoutes);

PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Express server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
