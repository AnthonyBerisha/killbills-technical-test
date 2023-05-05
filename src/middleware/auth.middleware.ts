import { type Request, type Response, type NextFunction } from "express";
import { AuthService } from "../auth/auth.service";
import { UnauthorizedException } from "~/Exceptions/UnauthorizedException";

const authService = new AuthService();

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const apiToken = req.header("x-api-key");
  try {
    if (apiToken == null) {
      throw new UnauthorizedException();
    }
    const token = await authService.checkToken(apiToken);

    if (token == null) {
      throw new UnauthorizedException();
    }
  } catch (error: any) {
    next(error);
  }
  next();
}
