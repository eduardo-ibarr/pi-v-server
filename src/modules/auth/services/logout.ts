import { AuthService } from "./auth";

export class LogoutService {
  constructor(private readonly authService: AuthService) {}

  async logout(): Promise<void> {
    // await this.authService.logout();
  }
}
