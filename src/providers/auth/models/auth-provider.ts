export interface IAuthProvider {
  authenticate(email: string, role: string): Promise<string>;
  validate(token: string): Promise<boolean>;
}
