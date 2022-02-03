import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import Postroute from "./routes/posts.js";
import dotenv from "dotenv";
const app = express();
dotenv.config({ path: "./config.env" });

app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.use("/posts", Postroute);

// const DB =
//   "mongodb+srv://admin:admin@cluster0.hqfrd.mongodb.net/MEMORIES?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;
const DATABASE = process.env.DATABASE;
mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));
