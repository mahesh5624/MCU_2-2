import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// ---------------- MAIN ROUTES ----------------

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "web2.html"));
});

app.get("/web2.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "web2.html"));
});

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

app.get("/hello.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "hello.html"));
});

app.get("/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ---------------- HEROES ----------------

app.get("/ironman.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "ironman.html"));
});

app.get("/spiderman.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "spiderman.html"));
});

// ---------------- VILLAINS ----------------

app.get("/thonas.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "thonas.html"));
});

app.get("/loki.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "loki.html"));
});

// ---------------- MOVIES ----------------

app.get("/ironman2008.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "ironman2008.html"));
});

app.get("/ironman2010.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "ironman2010.html"));
});

app.get("/iron_man_2013.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "iron_man_2013.html"));
});

app.get("/thor2011.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "thor2011.html"));
});

app.get("/thor_2013.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "thor_2013.html"));
});

app.get("/thor_2017.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "thor_2017.html"));
});

// ---------------- CONTACT FORM ----------------

app.post("/submit_form", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  return res.json({
    success: true,
    message: "Message received! Thank you.",
  });
});

// ---------------- SERVER ----------------

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
