let mongoose = require("mongoose");
require("dotenv").config();

const connectionString = process.env.MONGO_DB_URL;

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(connectionString, { useNewUrlParser: true })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch(err => {
        console.error("Database connection error");
      });
  }
}

module.exports = new Database();
