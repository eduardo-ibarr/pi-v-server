import { AppError } from "../../../app/errors/app-error";
import { IHashProvider } from "../../../providers/hash/models/hash-provider";
import { CreateUserDTO } from "../models/dtos/create-user-dto";
import { User } from "../models/user";
import { IUsersRepository } from "../models/users-repository";

export class CreateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider
  ) {}

  async execute(data: CreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new AppError("E-mail já cadastrado.");
    }

    try {
      data.password = await this.hashProvider.generateHash(data.password);
      await this.usersRepository.create(data);
    } catch (error) {
      console.log(error);
      throw new AppError("Erro ao criar usuário.", 500);
    }
  }
}
