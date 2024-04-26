import { User } from "../models/user";
import { IUsersRepository } from "../models/users-repository";

export class ListUsersService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.usersRepository.list();
    return users;
  }
}
