import { AppError } from "../../../app/errors/app-error";
import { UpdateUserDTO } from "../models/dtos/update-user-dto";
import { User } from "../models/user";
import { IUsersRepository } from "../models/users-repository";

export class UpdateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: UpdateUserDTO): Promise<User> {
    const user = await this.usersRepository.findById(data.id);

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists && userAlreadyExists.id !== data.id) {
      throw new AppError("Usuário já existe.", 409);
    }

    const updatedUser = await this.usersRepository.update(data.id, data);

    return updatedUser;
  }
}
