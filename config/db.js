import mongoose from "mongoose";
import colors from "colors";

colors.enable();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Connection to MongoDB database: ${conn.connection.host}`.bgMagenta.bold
    );
  } catch (error) {
    console.error(`Error: ${error.message}`.bgRed.white.bold);
  }
};

export default connectDB;
