import { IAuthProvider } from "../../../providers/auth/models/auth-provider";
import { IHashProvider } from "../../../providers/hash/models/hash-provider";
import { User } from "../../users/models/user";
import { UsersRepository } from "../../users/repositories/users-repository";

export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashProvider: IHashProvider,
    private readonly authProvider: IAuthProvider
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.hashProvider.compareHash(
      password,
      user.password
    );

    return isPasswordValid ? user : null;
  }

  generateToken(user: User): Promise<string> {
    return this.authProvider.authenticate(user.email, user.role);
  }
}
