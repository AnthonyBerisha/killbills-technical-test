import { type Request, type Response, type NextFunction } from "express";
import { AuthService } from "../auth/auth.service";

const authService = new AuthService();

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req.body || !req.body.token || !req.body.token.length) {
    res.status(401).send();
    return;
  }
  const token = await authService.checkToken(req.body.token);

  if (token) {
    next();
  }

  res.status(401).send();
}
