const mongoose = require("mongoose");
const {config} = require('dotenv');
config();
const MONGO_URI =process.env.MONGO_URI;

const initDB = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to DB')
  } catch (error) {
     throw new Error(`Error in MOngoDB connection ${error}`)
  }
};

module.exports = {initDB};