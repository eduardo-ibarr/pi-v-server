export interface IEnvironmentProvider {
  readonly NODE_ENV: string;
  readonly PORT: number;

  readonly JWT_SECRET: string;
  readonly JWT_EXPIRATION: string;

  readonly DB_HOST: string;
  readonly DB_PORT: number;
  readonly DB_NAME: string;
  readonly DB_USER: string;
  readonly DB_PASSWORD: string;
}
