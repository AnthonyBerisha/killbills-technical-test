import { type Request, type Response, type NextFunction } from "express";
import { RateLimiterService } from "../rate_limiter/rate_limiter.service";
import { PaymentRequiredException } from "~/Exceptions/PaymentRequiredException";
import { UnauthorizedException } from "~/Exceptions/UnauthorizedException";
import { BadRequestException } from "~/Exceptions/BadRequestException";
const rateLimiterService = new RateLimiterService();

export async function rateLimiterMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const apiToken = req.header("x-api-key");
  const text = req.body;

  try {
    if (apiToken?.length == null || apiToken === null) {
      throw new UnauthorizedException();
    }

    if (text.length === 0) {
      throw new BadRequestException();
    }

    if (!(await rateLimiterService.check(apiToken, text))) {
      throw new PaymentRequiredException();
    }
  } catch (error: any) {
    next(error);
  }

  next();
}
