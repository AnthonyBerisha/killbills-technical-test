import { create, get } from "../db/dal/token";
import type Token from "../db/models/Token";
import { isEmail } from "../utils/email";
import { type AuthPayload } from "../../types/AuthPayload";
const bcrypt = require("bcrypt");
export class AuthService {
  // Check if email is an email
  verify(authPayload: AuthPayload): boolean {
    return isEmail(authPayload.email);
  }

  async register(authPayload: AuthPayload): Promise<string> {
    let token: Token = await this.getToken(authPayload.email);
    if (!token) {
      token = await this.createToken(authPayload.email);
    }
    return token.token;
  }

  async getToken(email: string): Promise<Token> {
    return await get("email", email);
  }

  private async createToken(email: string): Promise<Token> {
    const token = bcrypt.hash(email, 1, async (_err: any, hash: string) => {
      try {
        return await create({ token: hash, email });
      } catch (e: unknown) {
        throw new Error("Failed to create token");
      }
    });

    return token;
  }
}
