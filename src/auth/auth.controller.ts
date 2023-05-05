import { type Request, type Response, Router } from "express";
import { AuthService } from "./auth.service";

const AuthController = Router();
const authService = new AuthService();

AuthController.post("/token", async (req: Request, res: Response) => {
  if (!!req.body.email && authService.verify(req.body)) {
    const token = await authService.register(req.body);

    res.json({ token });
  } else {
    res.status(404).send("Sorry, cant find that");
  }
});

export { AuthController };
