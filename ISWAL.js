// ISWAL.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const nodemailer = require("nodemailer");

const app = express();

// --- CONFIG ---
app.set("view engine", "ejs"); // or pug/hbs, depending on your templates
app.set("views", path.join(__dirname, "templates")); // Flask uses templates folder

app.use(express.static(path.join(__dirname, "static"))); // Flask's static
app.use(bodyParser.urlencoded({ extended: false }));

// Flash messages
app.use(session({
  secret: "any_thing",
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Mailtrap (replace with your vars)
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAIL_USERNAME, // like MAIL_USERNAME in vars.py
    pass: process.env.MAIL_PASSWORD
  }
});

// --- ROUTES ---
app.get("/", (req, res) => {
  res.render("Accueil", { title: "Accueil", custo_css: "Accueil", messages: req.flash("success") });
});

app.get("/À propos", (req, res) => {
  res.render("À_propos", { title: "À propos", custo_css: "À_propos" });
});

app.get("/Services", (req, res) => {
  res.render("Services", { title: "Services", custo_css: "Services" });
});

app.get("/Projects", (req, res) => {
  res.render("Projects", { title: "Projects", custo_css: "Projects" });
});

// Albums
for (let i = 1; i <= 6; i++) {
  app.get(`/album${i}`, (req, res) => {
    res.render(`album${i}`, { title: `album${i}`, custo_css: "album" });
  });
}

app.get("/Contact", (req, res) => {
  res.render("Contact", { title: "Contact", custo_css: "Contact", messages: req.flash("success") });
});

// Handle email form
app.post("/send_email", (req, res) => {
  const { name, email, message, Téléphone, Sujet } = req.body;

  const mailOptions = {
    from: "mmedd9032@gmail.com",
    to: "recipient@example.com",
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}
Téléphone: ${Téléphone}
Email: ${email}
Sujet: ${Sujet}
Message: ${message}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      req.flash("error", "Message failed to send.");
    } else {
      console.log("Email sent: " + info.response);
      req.flash("success", "Message sent successfully!");
    }
    res.redirect("/Contact");
  });
});

// --- SERVER ---
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
