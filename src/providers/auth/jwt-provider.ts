import { sign, verify } from "jsonwebtoken";
import { IAuthProvider } from "./models/auth-provider";
import { Environment } from "../environment/env-variables";

export class JWTProvider implements IAuthProvider {
  private environment: Environment = new Environment();

  public async authenticate(email: string, role: string): Promise<string> {
    const token = sign(
      {
        email,
        role,
      },
      this.environment.JWT_SECRET,
      {
        subject: email,
        expiresIn: this.environment.JWT_EXPIRATION,
      }
    );

    return token;
  }

  public async validate(token: string): Promise<boolean> {
    try {
      const decoded = verify(token, this.environment.JWT_SECRET);
      return !!decoded;
    } catch {
      return false;
    }
  }
}
