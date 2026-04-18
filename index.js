require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/configs/db");

// Routes
const authRoutes = require("./src/modules/auth/authRoutes");
const passRoutes = require("./src/modules/password/passRoutes");
const userRoutes = require("./src/modules/user/userRoutes");
const postRoutes = require("./src/modules/post/postRoutes");
const noticeRoutes = require("./src/modules/notice/noticeRoutes");
const eventRoutes = require("./src/modules/event/eventRoutes");
const messageRoutes = require("./src/modules/message/messageRoutes");
const galleryRoutes = require("./src/modules/gallery/galleryRoutes");
const donationRoutes = require("./src/modules/donation/donationRoutes");
const generateSitemap = require("./utils/generateSitemap");

const app = express();

/* =========================
   GLOBAL MIDDLEWARE
========================= */
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "https://maa-doyamoyee.com",
      "https://www.maa-doyamoyee.com",
      "https://maa-doyamoyee.vercel.app", 
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);

/* =========================
   DB CONNECTION (SAFE)
   - connect only once
   - no per-request middleware
========================= */
connectDB().catch((err) => {
  console.error("DB INIT FAILED:", err.message);
});

/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("Maa Doyamoyee Server & MongoDB Connected 🚀");
});
app.get("/sitemap.xml", generateSitemap);

/* =========================
   API ROUTES
========================= */
app.use("/api/v1/gallery", galleryRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/password", passRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notices", noticeRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/donation", donationRoutes);

/* =========================
   EXPORT FOR VERCEL
========================= */
//  NO app.listen in Vercel
app.listen(5000, () => {
  console.log(`Mongoose Server running on port 5000`);
});

module.exports = app;
