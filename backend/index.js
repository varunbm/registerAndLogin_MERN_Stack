const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const User = require("./model/user");
const config = require("./config/key");
const auth = require("./middleWare/auth");

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(cors());

console.log("----------->>>>>>", config.mongoUri);
//mongo DB connection
mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DB connected successfully...`))
  .catch((err) => console.log(`Error ---> ${err}`));

// Routers
app.get("/", (req, res) => {
  res.json("Hello World!!");
});

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
  });
});

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => res.json("User added"))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

app.post("/api/users/login", (req, res) => {
  //find email in the DB

  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found.",
      });
    //compare the password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ loginSuccess: false, message: "Wrong password." });
      }
    });
    //generateToken
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res.cookie("x_auth", user.token).status(200).json({ loginSuccess: true });
    });
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  console.log(`Listening on port ${port}`);
});
