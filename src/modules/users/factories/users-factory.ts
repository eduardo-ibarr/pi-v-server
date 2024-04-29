import { MySQLProvider } from "../../../providers/database/mysql-provider";
import { NodemailerProvider } from "../../../providers/email/nodemailer-provider";
import { BCryptProvider } from "../../../providers/hash/bcrypt-provider";
import { UsersRepository } from "../repositories/users-repository";
import { CreateUserService } from "../services/create-user";
import { DeleteUserService } from "../services/delete-user";
import { GetUserByIdService } from "../services/get-user-by-id";
import { ListUsersService } from "../services/list-users";
import { ResetPasswordService } from "../services/reset-password";
import { UpdateUserService } from "../services/update-user";

export class UsersFactory {
  static makeGetUserByIdService() {
    return new GetUserByIdService(new UsersRepository(new MySQLProvider()));
  }

  static makeCreateUserService() {
    return new CreateUserService(
      new UsersRepository(new MySQLProvider()),
      new BCryptProvider()
    );
  }

  static makeUpdateUserService() {
    return new UpdateUserService(new UsersRepository(new MySQLProvider()));
  }

  static makeDeleteUserService() {
    return new DeleteUserService(new UsersRepository(new MySQLProvider()));
  }

  static makeListUsersService() {
    return new ListUsersService(new UsersRepository(new MySQLProvider()));
  }

  static makeResetPasswordService() {
    return new ResetPasswordService(
      new UsersRepository(new MySQLProvider()),
      new NodemailerProvider()
    );
  }
}
