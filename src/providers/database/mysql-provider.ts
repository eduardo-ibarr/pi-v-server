import { Pool, QueryResult, createPool } from "mysql2/promise";
import { IDatabaseProvider } from "./models/database-provider";
import { Environment } from "../../app/environment";

export class MySQLProvider implements IDatabaseProvider {
  private pool: Pool;

  private readonly config = {
    host: Environment.DB_HOST,
    port: Environment.DB_PORT,
    database: Environment.DB_NAME,
    user: Environment.DB_USER,
    password: Environment.DB_PASSWORD,
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
