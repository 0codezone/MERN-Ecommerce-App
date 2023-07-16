import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";

const PORT = process.env.PORT || 5000;

//rest object-----------------------------
const app = express();

//configure env----------------------------
dotenv.config();
colors.enable();

//database config (must be after dotenv)-----------------
connectDB();

// middeleware-----------------------------------
app.use(express.json());
app.use(morgan("dev"));

//routes---------------------------------
app.use("/api/v1/auth", authRoute);

//testing rest api routes---------------------------------
app.get("/", (req, res) => {
  res.send("<h1>server is ready</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});
