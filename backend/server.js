const mongoose = require("mongoose");

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const interviewRoutes = require("./routes/interviewRoutes");
const ttsRoutes = require("./routes/ttsRoutes");
const connectDB = require("./config/db");
// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use("/api", interviewRoutes);

app.use("/api", ttsRoutes);


mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

});
