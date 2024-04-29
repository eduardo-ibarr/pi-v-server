import { JWTProvider } from "../../../providers/auth/jwt-provider";
import { MySQLProvider } from "../../../providers/database/mysql-provider";
import { BCryptProvider } from "../../../providers/hash/bcrypt-provider";
import { UsersRepository } from "../../users/repositories/users-repository";
import { AuthService } from "../services/auth";
import { LoginService } from "../services/login";
import { LogoutService } from "../services/logout";

export class AuthFactory {
  static makeLoginService() {
    return new LoginService(AuthFactory.makeAuthService());
  }

  static makeLogoutService() {
    return new LogoutService(AuthFactory.makeAuthService());
  }

  static makeAuthService() {
    return new AuthService(
      new UsersRepository(new MySQLProvider()),
      new BCryptProvider(),
      new JWTProvider()
    );
  }
}
