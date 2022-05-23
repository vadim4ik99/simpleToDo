import express from "express";
import * as dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import { todoRoutes } from "./routes/Routes";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded());
app.use(todoRoutes);

async function start() {
  try {
    await mongoose
      .connect(process.env.DB_CONNECT!, {
        useNewUrlParser: true,
      } as ConnectOptions)
      .then((res) => {
        console.log("db ok");
        app.listen(3000, () => {
          console.log("Run server");
        });
      });
  } catch (error) {
    console.log(error);
  }
}
start();
