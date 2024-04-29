import { Environment } from "../../app/environment";
import { IHashProvider } from "./models/hash-provider";
import bcrypt from "bcrypt";

export class BCryptProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    const salt = await bcrypt.genSalt(Environment.SALT);
    return bcrypt.hash(payload, salt);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed);
  }
}
