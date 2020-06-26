if (process.env.NODE_ENV === "production") {
  console.log("Node env production..");
  module.exports = require("./prod");
} else {
  console.log("Dev");
  module.exports = require("./dev");
}
