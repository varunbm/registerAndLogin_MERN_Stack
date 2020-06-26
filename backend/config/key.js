if (process.env.NODE_ENV === "production") {
  console.log("Node env production..");
  mongoUri: process.env.MONGO_URI;
  console.log("----------->>>>>>", mongoUri.MONGO_URI);
  // module.exports = require("./prod");
} else {
  console.log("Dev");
  module.exports = require("./dev");
}
