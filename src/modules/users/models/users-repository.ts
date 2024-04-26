import { CreateUserDTO } from "./dtos/create-user-dto";
import { UpdateUserDTO } from "./dtos/update-user-dto";
import { User } from "./user";

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  updateResetPasswordToken(
    email: string,
    token: string,
    expiry: Date
  ): Promise<void>;
  updatePassword(email: string, password: string): Promise<void>;
  create(data: CreateUserDTO): Promise<User>;
  findById(id: number): Promise<User | undefined>;
  list(): Promise<User[]>;
  update(id: number, data: UpdateUserDTO): Promise<User>;
  delete(id: number): Promise<void>;
}
