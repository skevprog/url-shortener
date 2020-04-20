const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://admin:admin@cluster0-zfjxk.mongodb.net/test?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongo db connected');
  } catch (err) {
    console.error(`Something went wrong => ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
