import express from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app = express();

// --------------------------------------------
// Middleware
// --------------------------------------------
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --------------------------------------------
// Path setup
// --------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------------------------------
// Static files
// --------------------------------------------
app.use(express.static(path.join(__dirname, "public")));

// --------------------------------------------
// MongoDB connection
// --------------------------------------------
const MONGO_URI = process.env.MONGO_URI || "your-mongodb-uri-here";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// --------------------------------------------
// Schema example (optional contact form)
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
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "web2.html"));
});

app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).json({ success: true, message: "Message saved!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error saving message" });
  }
});

// ✅ Fallback route (works on Express 5+)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "web2.html"));
});

// --------------------------------------------
// Start server
// --------------------------------------------
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
