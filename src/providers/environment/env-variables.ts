import { config } from "dotenv";
import { IEnvironmentProvider } from "./models/environment-provider";

config();

export class Environment implements IEnvironmentProvider {
  public readonly NODE_ENV: string = process.env.NODE_ENV || "development";
  public readonly PORT: number = parseInt(process.env.PORT || "3333");

  public readonly JWT_SECRET: string = process.env.JWT_SECRET as string;
  public readonly JWT_EXPIRATION: string = process.env.JWT_EXPIRATION as string;

  public readonly DB_HOST: string = process.env.DB_HOST as string;
  public readonly DB_PORT: number = parseInt(process.env.DB_PORT as string);
  public readonly DB_NAME: string = process.env.DB_NAME as string;
  public readonly DB_USER: string = process.env.DB_USER as string;
  public readonly DB_PASSWORD: string = process.env.DB_PASSWORD as string;
}
