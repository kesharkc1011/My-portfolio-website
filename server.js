const express = require("express");
const path = require("path");
require("dotenv").config();
console.log("Loaded EMAIL_USER:", process.env.EMAIL_USER);
const app = express();
const PORT = process.env.PORT || 3000;

const nodemailer = require("nodemailer");

// Middleware to serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse form data (for future contact form)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Contact form route
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // must be your Gmail
      replyTo: email, // so replies go to user
      to: process.env.EMAIL_USER, // receiving inbox (your Gmail)
      subject: `Portfolio Contact: ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`, // clearer formatting
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ success: false, message: "Message failed to send" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

/*const fs = require("fs");

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  const newEntry = {
    name,
    email,
    message,
    date: new Date().toISOString(),
  };

  //const filePath = path.join(process.cwd(), "data", "messages.json");

  const filePath = path.join(__dirname, "data", "messages.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    let messages = [];
    if (!err && data) {
      try {
        messages = JSON.parse(data);
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }
    }

    // Add new message
    messages.push(newEntry);

    // Save back to file
    fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
      if (err) {
        console.error("Error saving message:", err);
        return res.status(500).send("Something went wrong!");
      }
      console.log("✅ New contact saved:", newEntry);
      res.send("Thank you! Your message has been received.");
    });
    // <-- Add this closing brace for the route handler
  });
});
*/
