import { AppError } from "../../../app/errors/app-error";
import { IHashProvider } from "../../../providers/hash/models/hash-provider";
import { IUsersRepository } from "../models/users-repository";

export class ResetPasswordService {
  constructor(
    private usersRepository: IUsersRepository,
    private readonly hashProvider: IHashProvider
  ) {}

  async execute(email: string, token: string, password: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    if (user.password_reset_token_expiry < new Date()) {
      throw new AppError("Token expirado.");
    }

    if (user.password_reset_token !== token) {
      throw new AppError("Token inválido.");
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    await this.usersRepository.updatePassword(email, hashedPassword);
  }
}
