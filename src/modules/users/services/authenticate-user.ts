import { AppError } from "../../../app/errors/app-error";
import { IAuthProvider } from "../../../providers/auth/models/auth-provider";
import { IHashProvider } from "../../../providers/hash/models/hash-provider";
import { AuthenticateUserDTO } from "../models/dtos/authenticate-user-dto";
import { AuthenticateUserResponseDTO } from "../models/dtos/authenticate-user-response-dto";
import { IUsersRepository } from "../models/users-repository";

export class AuthenticateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
    private authProvider: IAuthProvider
  ) {}

  async execute(
    data: AuthenticateUserDTO
  ): Promise<AuthenticateUserResponseDTO> {
    const user = await this.usersRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError("E-mail ou senha incorretos.", 401);
    }

    const passwordMatch = await this.hashProvider.compareHash(
      data.password,
      user.password
    );

    if (!passwordMatch) {
      throw new AppError("E-mail ou senha incorretos.", 401);
    }

    try {
      const token = await this.authProvider.authenticate(user.email, user.role);

      return {
        token,
      };
    } catch (error) {
      throw new AppError("Erro ao autenticar usuário.", 500);
    }
  }
}
