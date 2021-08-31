require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const setup = require("./controllers/setup");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect(
  process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw Error(err);
    app.listen(8000, () => {
      console.log(`YOU CONNECT TO http://localhost:${PORT}`);
    });
  }
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", require("./api/index"));
setup(app);

// app.listen(8000, () => {
//   console.log(`YOU CONNECT TO http://localhost:${PORT}`);
// });
