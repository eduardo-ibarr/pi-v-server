import { AppError } from "../../../app/errors/app-error";
import { UserReturnedDTO } from "../models/dtos/user-returned";
import { User } from "../models/user";
import { IUsersRepository } from "../models/users-repository";

export class GetUserByEmailService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(email: string): Promise<UserReturnedDTO | null> {
    try {
      const user = await this.usersRepository.findByEmail(email);

      if (!user) {
        throw new AppError("Usuário não encontrado.", 404);
      }

      const {
        password,
        password_reset_token,
        password_reset_token_expiry,
        ...userWithoutSensitiveData
      } = user;

      return <UserReturnedDTO>userWithoutSensitiveData;
    } catch (error) {
      throw new AppError("Erro ao buscar usuário por e-mail.", 500);
    }
  }
}
