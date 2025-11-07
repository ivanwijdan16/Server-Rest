require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes/index.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// Root endpoint untuk testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Book Store API" });
});

// Hanya jalankan server jika bukan di Vercel
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

// Export app untuk Vercel
module.exports = app;
