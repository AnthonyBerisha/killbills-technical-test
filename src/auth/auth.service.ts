import { create, get } from "../db/dal/token";
import type Token from "../db/models/Token";
import { isEmail } from "../utils/email";
import { type AuthPayload } from "../../types/AuthPayload";
import { promisify } from "util";
const bcrypt = require("bcrypt");
export class AuthService {
  // Check if email is an email
  public verify(authPayload: AuthPayload): boolean {
    return isEmail(authPayload.email);
  }

  async register(authPayload: AuthPayload): Promise<string> {
    let token: Token | null = await this.getToken(authPayload.email);
    if (token === null || !token) {
      token = await this.createToken(authPayload.email);
    }
    return token.token;
  }

  public async getToken(email: string): Promise<Token | null> {
    return await get("email", email);
  }

  public async checkToken(token: string): Promise<Token | null> {
    return await get("token", token);
  }

  private async createToken(email: string): Promise<Token> {
    const hash = await promisify(bcrypt.hash)(email, 1);
    try {
      const token = await create({ token: hash, email });
      return token;
    } catch (e: unknown) {
      throw new Error("Failed to create token");
    }
  }
}
