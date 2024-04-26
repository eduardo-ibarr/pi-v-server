import { IEmailProvider } from "../../../providers/email/models/email-provider";
import { IUsersRepository } from "../models/users-repository";

export class ResetPasswordService {
  constructor(
    private usersRepository: IUsersRepository,
    private emailProvider: IEmailProvider
  ) {}

  async generateToken(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    const token = Math.random().toString(36).slice(-8);
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 1);

    await this.usersRepository.updateResetPasswordToken(email, token, expiry);
  }

  async sendTokenByEmail(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    const token = user.password_reset_token;

    await this.emailProvider.sendEmail(
      email,
      "Recuperação de senha",
      `Seu token de recuperação de senha é: ${token}`
    );
  }

  async execute(email: string, token: string, password: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    if (user.password_reset_token_expiry < new Date()) {
      throw new Error("Token expirado.");
    }

    if (user.password_reset_token !== token) {
      throw new Error("Token inválido.");
    }

    await this.usersRepository.updatePassword(email, password);
  }
}
