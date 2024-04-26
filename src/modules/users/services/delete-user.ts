import { AppError } from "../../../app/errors/app-error";
import { IUsersRepository } from "../models/users-repository";

export class DeleteUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: number): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      throw new AppError("Erro ao deletar usuário.", 500);
    }
  }
}
