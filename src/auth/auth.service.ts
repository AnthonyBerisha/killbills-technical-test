import { isEmail } from "~/utils/email";
import { type AuthPayload } from "~~/types/AuthPayload";

// TODO - Write auth token creation methods
export class AuthService {
  // Check if email is an email
  verify(authPayload: AuthPayload): boolean {
    return isEmail(authPayload.email);
  }

  register(authPayload: AuthPayload): void {
    if (this.userExists(authPayload.email)) {
        this.getToken(authPayload.email);
    }


    
  }

  userExists(email: string): boolean {
    // Check if email exists
  }

  private getToken() {
    // get the token from the passed user email
  }

  private generate() {
    // generate a token
  }
}
