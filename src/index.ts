import * as dotenv from "dotenv";
import express, { type Request, type Response } from "express";
import { JustifyController } from "~/justify/justify.controller";
import { AuthController } from "./auth/auth.controller";

const api = express();
dotenv.config();

api.use(express.json());
api.use("/api", JustifyController);
api.use("/api", AuthController);

api.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

api.listen(process.env.PORT, () => {
  console.log(`Running on port: ${process.env.PORT}`);
});
