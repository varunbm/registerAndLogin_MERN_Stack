const db = {
  mongoUri: process.env.MONGO_URI,
};

module.exports = db.mongoUri;
