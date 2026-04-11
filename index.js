require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/configs/db");
const { PORT } = require("./src/configs/config");
const allRoutes = require("./app");

const app = express();
const port = PORT || process.env.PORT;

app.use(express.json());
app.use(cookieParser());

// -----------------------------
// DATABASE CONNECTION
// -----------------------------
connectDB();

// -----------------------------
// CORS CONFIG
// -----------------------------
app.use(
  cors({
    origin: ["http://localhost:5173", "https://maa-doyamoyee.vercel.app"],
    credentials: true,
  }),
);

// -----------------------------
// TEST ROUTE
// -----------------------------
app.get("/", (req, res) =>
  res.send("Maa Doyamoyee Connected With Server & MongoDB"),
);

// -----------------------------
// API ROUTES
// -----------------------------
app.use("/api/v1", allRoutes);

// =====================================================
// ❌ VERCEL FIX (DO NOT USE app.listen in serverless)
// =====================================================

// app.listen(port, () => {
//   console.log(`Mongoose Server running on port ${port}`);
// });

// =====================================================
// 🔥 LOCAL DEVELOPMENT ONLY (UNCOMMENT WHEN NEEDED)
// =====================================================

// if (process.env.NODE_ENV !== "production") {
//   app.listen(port, () => {
//     console.log(`Mongoose Server running on port ${port}`);
//   });
// }

module.exports = app;
