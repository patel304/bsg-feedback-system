const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");   // ✅ Only once
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/*
========================
        MIDDLEWARE
========================
*/

const allowedOrigins = [
  "http://localhost:5173",
  "https://bsg-feedback-system.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

/*
========================
        ROUTES
========================
*/

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.get("/", (req, res) => {
  res.send("BSG Backend Running");
});

/*
========================
        404 Handler
========================
*/
app.use((req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
});

/*
========================
        GLOBAL ERROR
========================
*/
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
