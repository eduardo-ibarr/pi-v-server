import { Request, Response } from "express";
import { UsersFactory } from "../../factories/users-factory";
import { IValidationProvider } from "../../../../providers/validation/models/validation-provider";
import { createUserSchema } from "../../models/schemas/create-user-schema";
import { updateUserSchema } from "../../models/schemas/update-user-schema";
import { paramsSchema } from "../../models/schemas/params-schema";

export class UsersController {
  constructor(
    private usersFactory: typeof UsersFactory,
    private readonly validationProvider: IValidationProvider
  ) {}

  async list(request: Request, response: Response) {
    const listUsersService = this.usersFactory.makeListUsersService();
    const users = await listUsersService.execute();

    return response.json(users);
  }

  async create(request: Request, response: Response) {
    await this.validationProvider.validate(request.body, createUserSchema);

    const createUserService = this.usersFactory.makeCreateUserService();
    const user = await createUserService.execute(request.body);
    return response.status(201).json(user);
  }

  async update(request: Request, response: Response) {
    await this.validationProvider.validate(request.body, updateUserSchema);
    await this.validationProvider.validate(request.params, paramsSchema);

    const { id } = request.params;
    const { name, email, phone } = request.body;

    const updateUserService = this.usersFactory.makeUpdateUserService();

    await updateUserService.execute({
      id: Number(id),
      name,
      email,
      phone,
    });

    return response.status(204).send();
  }

  async delete(request: Request, response: Response) {
    await this.validationProvider.validate(request.params, paramsSchema);

    const { id } = request.params;
    const deleteUserService = this.usersFactory.makeDeleteUserService();
    await deleteUserService.execute(Number(id));

    return response.status(204).send();
  }

  async show(request: Request, response: Response) {
    await this.validationProvider.validate(request.params, paramsSchema);

    const { id } = request.params;
    const getUserByIdService = this.usersFactory.makeGetUserByIdService();
    const user = await getUserByIdService.execute(Number(id));

    return response.json(user);
  }

  async resetPassword(request: Request, response: Response) {
    await this.validationProvider.validate(request.params, paramsSchema);

    const { email } = request.body;
    const resetPasswordService = this.usersFactory.makeResetPasswordService();
    await resetPasswordService.generateToken(email);
    await resetPasswordService.sendTokenByEmail(email);

    return response.status(204).send();
  }
}
