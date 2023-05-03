import { type Request, type Response, Router } from "express";
import { AuthService } from "./auth.service";
import { log } from "console";

const AuthController = Router();
const authService = new AuthService();
/*
    TODO
    - AuthService.verify(req.body.email)
    - AuthService.exists(req.body.email) -> Check in db if email is already registered and generate a token
    - Return token
*/
AuthController.post("/token", (req: Request, res: Response) => {
  if (Boolean(req.body.email) && authService.verify(req.body)) {
    return authService.register(req.body);
  }
  return res.send("Here is your token");
});

export { AuthController };
