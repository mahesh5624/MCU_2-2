import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();

// ---------------- PATH SETUP ----------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------- MIDDLEWARE ----------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- STATIC FILES ----------------
app.use(express.static(path.join(__dirname, "public")));

// ---------------- MONGODB CONNECTION ----------------
mongoose.set("strictQuery", false);

const MONGO_URI = "mongodb+srv://admin:admin123@cluster0.vjwxtdc.mongodb.net/mcu_website?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => {
  console.log("❌ MongoDB Failed but server will run:", err.message);
});

// ---------------- SCHEMA ----------------
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

// ---------------- ROUTES ----------------

// ✅ HOME
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "web2.html"));
});

// ✅ ALL PAGES (VERY IMPORTANT FIX)
app.get("/heroes.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "heroes.html"));
});

app.get("/villains.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "villains.html"));
});

app.get("/movies.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "movies.html"));
});

app.get("/about2.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about2.html"));
});

app.get("/contact-us.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact-us.html"));
});

// ✅ CONTACT API
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required ❗"
      });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.json({
      success: true,
      message: "Message saved successfully ✅"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error ❌"
    });
  }
});

// ⚠️ KEEP THIS LAST (fallback)
app.use((req, res) => {
  res.status(404).send("Page Not Found ❌");
});

// ---------------- SERVER ----------------
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
