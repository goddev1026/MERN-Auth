import mongoose from "mongoose";

const { MONGODB_HOST, MONGODB_PORT, MONGODB_DBNAME } = process.env;

const MONGODB_URI = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DBNAME}`;

mongoose.connect(
  MONGODB_URI,
  {
    keepAlive: true,
  },
  (err) => {
    if (err) {
      console.log("Error on MongoDB connect");
      process.exit(1);
    } else {
      console.log("MongoDB connected successfully.");
    }
  }
);
