const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectToMongoose = async () => {
  try {
    const db = await mongoose.connect("mongodb://localhost:27017/bank", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to Mongoose Through ${db.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = {
  connectToMongoose,
};
