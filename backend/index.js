const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Sample = require("./model/user");
const app = express();
const config = require("./config/key");
require("dotenv").config();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(cors());

//mongo DB connection
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DB connected successfully...`))
  .catch((err) => console.log(`Error --> ${err}`));

// Routers
app.get("/", (req, res) => {
  res.json("Hello World!!");
});

app.post("/api/sample1/register", (req, res) => {
  const user = new Sample(req.body);
  user
    .save()
    .then(() => res.json("User added"))
    .catch((err) => res.status(400).json(`Error ${err}`));
  //   user.save((err, userdata) => {
  //     if (err) return res.status(400).json({ Success: false, err });
  //   });
  //   return res.status(200).json("Success");
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
