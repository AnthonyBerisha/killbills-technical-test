import { type Request, type Response, Router } from "express";
import { AuthService } from "./auth.service";

const authController = Router();
const authService = new AuthService();

authController.post("/token", async (req: Request, res: Response) => {
  if (!!req.body.email && authService.verify(req.body)) {
    const token = await authService.register(req.body);

    res.json({ token });
  } else {
    res.status(404).send();
  }
});

export { authController };
