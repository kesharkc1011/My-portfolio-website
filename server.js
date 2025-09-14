const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

//const nodemailer = requie("nodemailer");

// Middleware to serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse form data (for future contact form)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

const fs = require("fs");

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
