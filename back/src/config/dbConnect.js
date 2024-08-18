require("dotenv").config();
const { DB_TYPE, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_OPTIONS } = process.env;

const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(`${DB_TYPE}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?${DB_OPTIONS}`);
    console.log('Conectado a la base de datos');
  } catch (error) {
    throw error;
  };
};



