import { Pool, QueryResult, createPool } from "mysql2/promise";
import { IDatabaseProvider } from "./models/database-provider";
import { Environment } from "../environment/env-variables";

export class MySQLProvider implements IDatabaseProvider {
  private pool: Pool;
  private environment: Environment = new Environment();

  private readonly config = {
    host: this.environment.DB_HOST,
    port: this.environment.DB_PORT,
    database: this.environment.DB_NAME,
    user: this.environment.DB_USER,
    password: this.environment.DB_PASSWORD,
  };

  constructor() {
    this.pool = createPool(this.config);
  }

  async query(query: string, values?: any[]): Promise<QueryResult> {
    try {
      const [results] = await this.pool.query(query, values);
      return results;
    } catch (error) {
      throw error;
    }
  }
}
