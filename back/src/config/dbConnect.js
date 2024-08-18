require("dotenv").config();
const { DB_TYPE, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_OPTIONS } = process.env;
const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const uri = `${DB_TYPE}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?${DB_OPTIONS}`;
    await mongoose.connect(uri);
    console.log('Connected to database');
  } catch (error) {
    throw error;
  }
};
