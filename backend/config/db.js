const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;