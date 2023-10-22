// dbConn.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // встановлюємо з'єднання з базою даних
    console.log('Trying to connect to Atlas cloud service...');
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.log(err)
  }
};

module.exports = connectDB;
