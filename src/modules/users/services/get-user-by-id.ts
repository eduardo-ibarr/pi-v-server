import { AppError } from "../../../app/errors/app-error";
import { UserReturnedDTO } from "../models/dtos/user-returned";
import { IUsersRepository } from "../models/users-repository";

export class GetUserByIdService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: number) {
    try {
      const user = await this.usersRepository.findById(id);

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
      throw new AppError("Erro ao buscar usuário por ID.", 500);
    }
  }
}
