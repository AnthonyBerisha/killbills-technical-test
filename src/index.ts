const dotenv = require("dotenv").config();
import express, { type Request, type Response } from "express";
import { JustifyController } from "./justify/justify.controller";
import { AuthController } from "./auth/auth.controller";
import dbInit from "./db/init";
const api = express();

api.use(express.json());
api.use("/api", JustifyController);
api.use("/api", AuthController);

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
