// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

// ----------------------------
// Middleware
// ----------------------------
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static frontend files

// ----------------------------
// MongoDB Atlas connection
// ----------------------------
mongoose.connect(
  "mongodb+srv://maheshkorra220418_db_user:mahesh5624@cluster0.qy27dgh.mongodb.net/mcu2-2?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ----------------------------
// Contact Schema
// ----------------------------
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});
const Contact = mongoose.model("Contact", contactSchema);

// ----------------------------
// Contact Form Submission
// ----------------------------
app.post("/submit_form", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).json({ message: "Thank you for your message!" });
  } catch (error) {
    console.error("Error saving contact form:", error);
    res
      .status(500)
      .json({ message: "Failed to save your message. Please try again later." });
  }
});

// ----------------------------
// Serve Frontend
// ----------------------------

// Serve main web2.html for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "web2.html"));
});

// Fallback — for any undefined routes, show main site
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "web2.html"));
});

// ----------------------------
// Start Server
// ----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
