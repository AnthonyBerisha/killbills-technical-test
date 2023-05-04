import { create } from "../db/dal/token";
import Token, { type TokenOutput } from "../db/models/Token";
import { isEmail } from "../utils/email";
import { type AuthPayload } from "../../types/AuthPayload";
const bcrypt = require("bcrypt");
export class AuthService {
  // Check if email is an email
  verify(authPayload: AuthPayload): boolean {
    return isEmail(authPayload.email);
  }

  async register(authPayload: AuthPayload): Promise<TokenOutput> {
    // let token = await this.getToken(authPayload.email);

    // if (typeof token !== "undefined" || token !== null) {
    // console.table("nothing");

    const token = await this.createToken(authPayload.email);

    return token;
    // }
  }

  // async getToken(email: string): Promise<TokenOutput> {
  //   // Check if email exists
  //   const query = "SELECT * FROM tokens LIMIT 1";
  // }

  private async createToken(email: string): Promise<TokenOutput> {
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
