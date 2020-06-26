const { mongoUri } = require("./dev");

module.export = {
  mongoUri: process.env.MONGO_URI,
};
console.log("----------->>>>>>", process.env.MONGO_URI, mongoUri);
