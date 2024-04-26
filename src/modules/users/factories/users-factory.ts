import { JWTProvider } from "../../../providers/auth/jwt-provider";
import { MySQLProvider } from "../../../providers/database/mysql-provider";
import { NodemailerProvider } from "../../../providers/email/nodemailer-provider";
import { BCryptProvider } from "../../../providers/hash/bcrypt-provider";
import { UsersRepository } from "../repositories/users-repository";
import { AuthenticateUserService } from "../services/authenticate-user";
import { CreateUserService } from "../services/create-user";
import { DeleteUserService } from "../services/delete-user";
import { GetUserByIdService } from "../services/get-user-by-id";
import { ListUsersService } from "../services/list-users";
import { ResetPasswordService } from "../services/reset-password";
import { UpdateUserService } from "../services/update-user";

export class UsersFactory {
  public createGetUserByIdService() {
    return new GetUserByIdService(new UsersRepository(new MySQLProvider()));
  }

  public createCreateUserService() {
    return new CreateUserService(
      new UsersRepository(new MySQLProvider()),
      new BCryptProvider()
    );
  }

  public createUpdateUserService() {
    return new UpdateUserService(new UsersRepository(new MySQLProvider()));
  }

  public createDeleteUserService() {
    return new DeleteUserService(new UsersRepository(new MySQLProvider()));
  }

  public createListUsersService() {
    return new ListUsersService(new UsersRepository(new MySQLProvider()));
  }

  public createAuthenticateUserService() {
    return new AuthenticateUserService(
      new UsersRepository(new MySQLProvider()),
      new BCryptProvider(),
      new JWTProvider()
    );
  }

  public createResetPasswordService() {
    return new ResetPasswordService(
      new UsersRepository(new MySQLProvider()),
      new NodemailerProvider()
    );
  }
}
