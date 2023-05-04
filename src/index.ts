import * as dotenv from "dotenv";
import express, { type Request, type Response } from "express";
import { JustifyController } from "~/justify/justify.controller";
import { AuthController } from "./auth/auth.controller";
import Database from "./database";

const api = express();
const db = new Database();
dotenv.config();

api.use(express.json());
api.use("/api", JustifyController);
api.use("/api", AuthController);

api.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

async function start(): Promise<void> {
  await db.migrate();

  api.listen(process.env.PORT, () => {
    console.log(`Running on port: ${process.env.PORT}`);
  });
}

start();
