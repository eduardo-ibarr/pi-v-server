export interface IDatabaseProvider {
  query(query: string, values?: any[]): Promise<any>;
  getConnection(): Promise<any>;
}
