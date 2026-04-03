import express from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import cors from "cors";

dotenv.config();
const app = express();

// --------------------------------------------
// Path setup
// --------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------------------------------
// Middleware
// --------------------------------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------------------------------
// Static files
// --------------------------------------------
app.use(express.static(path.join(__dirname, "public")));

// --------------------------------------------
// MongoDB connection (SECURE)
// --------------------------------------------
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.log("❌ MONGO_URI not found in .env");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// --------------------------------------------
// Schema (Contact Form)
// --------------------------------------------
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

// --------------------------------------------
// Routes
// --------------------------------------------

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "web2.html"));
});

// Contact form
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required ❗",
      });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.json({
      success: true,
      message: "Message saved successfully ✅",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error ❌",
    });
  }
});

// --------------------------------------------
// Fallback route
// --------------------------------------------
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "web2.html"));
});

// --------------------------------------------
// Server
// --------------------------------------------
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
