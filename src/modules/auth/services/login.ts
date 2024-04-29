import { AppError } from "../../../app/errors/app-error";
import { AuthRequestDto } from "../models/dtos/auth-request-dto";
import { AuthResponseDto } from "../models/dtos/auth-response-dto";
import { AuthService } from "./auth";

export class LoginService {
  constructor(private readonly authService: AuthService) {}

  async login(authRequestDto: AuthRequestDto): Promise<AuthResponseDto> {
    const { email, password } = authRequestDto;

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new AppError("E-mail ou senha incorretos.", 401);
    }

    return {
      token: await this.authService.generateToken(user),
    };
  }
}
