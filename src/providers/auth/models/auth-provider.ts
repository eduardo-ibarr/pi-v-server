export interface IAuthProvider {
  authenticate(email: string, role: string, id: number): Promise<string>;
  validate(token: string): Promise<boolean>;
  decode(token: string): Promise<any>;
}
