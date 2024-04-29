import { Request, Response } from "express";
import { AuthFactory } from "../../factories/auth-factory";
import { IValidationProvider } from "../../../../providers/validation/models/validation-provider";
import { authSchema } from "../../models/schemas/auth-schema";

export class AuthController {
  constructor(
    private readonly authFactory: typeof AuthFactory,
    private readonly validationProvider: IValidationProvider
  ) {}

  async login(req: Request, res: Response): Promise<Response> {
    await this.validationProvider.validate(req.body, authSchema);

    const { email, password } = req.body;
    const request = { email, password };
    const loginService = this.authFactory.makeLoginService();
    const response = await loginService.login(request);
    return res.json(response);
  }

  async logout(req: Request, res: Response): Promise<Response> {
    const logoutService = this.authFactory.makeLogoutService();
    await logoutService.logout();
    return res.status(204).send();
  }
}
