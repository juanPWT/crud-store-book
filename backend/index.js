const express = require("express");
const cors = require("cors");
const db = require("./config/database.js");
const booksRoute = require("./route/booksRoute.js");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// app.use(bodyPrse.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

// Create api

app.get("/", (rwq, res) => {
  res.json("Hello There, is backend!!");
});

app.use("/books", booksRoute);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
