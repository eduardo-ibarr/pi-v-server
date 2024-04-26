import { AppError } from "../../../app/errors/app-error";
import { IUsersRepository } from "../models/users-repository";

export class GetUserByIdService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: number) {
    try {
      const user = await this.usersRepository.findById(id);

      if (!user) {
        throw new AppError("Usuário não encontrado.", 404);
      }

      return user;
    } catch (error) {
      throw new AppError("Erro ao buscar usuário por ID.", 500);
    }
  }
}
