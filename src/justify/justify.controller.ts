import { type Request, type Response, Router } from "express";
import { JustifyService } from "./justify.service";
import { authMiddleware } from "../middleware/auth.middleware";

const justifyController = Router();

const service = new JustifyService();

/*
    TODO
    - Get and check text to be justified
    - Count amount of words
    - Stop exec if daily rate limit exceeded
    - Call JustifyService's methods
    - Return result
*/
justifyController.post("/justify", authMiddleware, (req: Request, res: Response) => {
  res.set("Content-Type", "text/plain");
  return res.send(service.justify());
});

export { justifyController };
