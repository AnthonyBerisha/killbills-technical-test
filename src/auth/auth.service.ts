import { isEmail } from "~/utils/email";
import { type AuthPayload } from "~~/types/AuthPayload";
import Database from "~/database";
import { type Token } from "~~/types/Token";
const bcrypt = require("bcrypt");
// TODO - Write auth token creation methods
export class AuthService {
  private readonly db: Database;

  constructor() {
    this.db = new Database();
  }

  // Check if email is an email
  verify(authPayload: AuthPayload): boolean {
    return isEmail(authPayload.email);
  }

  async register(authPayload: AuthPayload): Promise<string | undefined> {
    let token = await this.getToken(authPayload.email);

    if (typeof token !== "undefined" || token !== null) {
      console.table("nothing");

      token = await this.createToken(authPayload.email);

      console.log(token);
      return;
      // return token.token;
    }

    return;
  }

  async getToken(email: string): Promise<Token> {
    // Check if email exists
    const query = "SELECT * FROM tokens LIMIT 1";
    return await this.db.get(query);
  }

  private async createToken(email: string): Promise<Token> {
    const token = bcrypt.hash(email, 1, async (_err: any, hash: string) => {
      try {
        return await this.db.create("tokens", { token: hash, email });
      } catch (e: unknown) {
        throw new Error("Failed to create token");
      }
    });

    return token;
  }
}
