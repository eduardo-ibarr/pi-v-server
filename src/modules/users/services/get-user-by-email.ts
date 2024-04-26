import { AppError } from "../../../app/errors/app-error";
import { User } from "../models/user";
import { IUsersRepository } from "../models/users-repository";

export class GetUserByEmailService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(email: string): Promise<User | null> {
    try {
      const user = await this.usersRepository.findByEmail(email);

      if (!user) {
        throw new AppError("Usuário não encontrado.", 404);
      }
      return user;
    } catch (error) {
      throw new AppError("Erro ao buscar usuário por e-mail.", 500);
    }
  }
}
