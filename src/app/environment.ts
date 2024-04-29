import { config } from "dotenv";

config();

export class Environment {
  static NODE_ENV: string = process.env.NODE_ENV || "development";
  static PORT: number = parseInt(process.env.PORT || "3333");

  static JWT_SECRET: string = process.env.JWT_SECRET as string;
  static JWT_EXPIRATION: string = process.env.JWT_EXPIRATION as string;

  static SALT: number = parseInt(process.env.JWT_SALT) as number;

  static DB_HOST: string = process.env.DB_HOST as string;
  static DB_PORT: number = parseInt(process.env.DB_PORT as string);
  static DB_NAME: string = process.env.DB_NAME as string;
  static DB_USER: string = process.env.DB_USER as string;
  static DB_PASSWORD: string = process.env.DB_PASSWORD as string;

  static MAILERSEND_API_KEY: string = process.env.MAILERSEND_API_KEY as string;
  static MAILERSEND_SENDER_EMAIL: string = process.env
    .MAILERSEND_SENDER_EMAIL as string;
  static MAILERSEND_SENDER_NAME: string = process.env
    .MAILERSEND_SENDER_NAME as string;
}
