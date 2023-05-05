import express, { type Request, type Response } from "express";
import { justifyController } from "./justify/justify.controller";
import { authController } from "./auth/auth.controller";
import dbInit from "./db/init";
const dotenv = require("dotenv").config();
const api = express();

api.use(express.json());
api.use("/api", justifyController);
api.use("/api", authController);

api.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

async function start(): Promise<void> {
  await dbInit();
  api.listen(process.env.PORT, () => {
    console.log(`Running on port: ${process.env.PORT}`);
  });
}

start();
