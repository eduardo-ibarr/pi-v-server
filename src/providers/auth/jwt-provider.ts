import { sign, verify } from "jsonwebtoken";
import { IAuthProvider } from "./models/auth-provider";
import { Environment } from "../../app/environment";

export class JWTProvider implements IAuthProvider {
  public async authenticate(
    email: string,
    role: string,
    id: number
  ): Promise<string> {
    const token = sign(
      {
        email,
        role,
        id,
      },
      Environment.JWT_SECRET,
      {
        subject: email,
        expiresIn: Environment.JWT_EXPIRATION,
      }
    );

    return token;
  }

  public async validate(token: string): Promise<boolean> {
    try {
      const decoded = verify(token, Environment.JWT_SECRET);
      return !!decoded;
    } catch {
      return false;
    }
  }

  public async decode(token: string): Promise<any> {
    try {
      const decoded = verify(token, Environment.JWT_SECRET);
      return decoded;
    } catch {
      return null;
    }
  }
}
