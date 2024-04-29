import { AppError } from "../../../app/errors/app-error";
import { IEmailProvider } from "../../../providers/email/models/email-provider";
import { IUsersRepository } from "../models/users-repository";

export class ForgotPasswordService {
  constructor(
    private usersRepository: IUsersRepository,
    private emailProvider: IEmailProvider
  ) {}

  async generateToken(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    const token = Math.random().toString(36).slice(-10);
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 15);

    await this.usersRepository.updateResetPasswordToken(email, token, expiry);
  }

  async sendTokenByEmail(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    const token = user.password_reset_token;

    await this.emailProvider.sendEmail(
      email,
      "Recuperação de senha",
      `Seu token de recuperação de senha é: ${token}`
    );
  }
}
