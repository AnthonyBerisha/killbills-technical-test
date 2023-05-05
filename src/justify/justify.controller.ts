import { type Request, type Response, Router } from "express";
import { JustifyService } from "./justify.service";
import { authMiddleware } from "../middleware/auth.middleware";
import { rateLimiterMiddleware } from "../middleware/rate_limiter.middleware";

const justifyController = Router();

const service = new JustifyService();

/*
    TODO
    - Call JustifyService's methods
    - Return result
*/
justifyController.post(
  "/justify",
  [authMiddleware, rateLimiterMiddleware],
  (req: Request, res: Response) => {
    const justifiedText = service.justify();

    res.send(justifiedText);
  }
);

export { justifyController };
