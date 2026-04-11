require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/configs/db");
const allRoutes = require("./app");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://maa-doyamoyee.vercel.app"],
    credentials: true,
  }),
);

// -----------------------------
// SAFE DB CONNECT (IMPORTANT)
// -----------------------------
let isConnected = false;

const dbConnect = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

// middleware: every request ensures DB
app.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (err) {
    console.log("DB ERROR:", err);
    res.status(500).json({ message: "DB connection failed" });
  }
});

// routes
app.get("/", (req, res) =>
  res.send("Maa Doyamoyee Connected With Server & MongoDB"),
);

app.use("/api/v1", allRoutes);

//  NO app.listen in Vercel
// app.listen(5000, () => {
//   console.log(`Mongoose Server running on port 5000`);
// });

module.exports = app;
