import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose
  .connect(
    process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("✅ DB is successfully connected"))
  .catch((e) => console.log(`❌ DB is not connected: ${error}`));
