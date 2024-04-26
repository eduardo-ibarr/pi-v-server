import { Request, Response } from "express";
import { UsersFactory } from "../../factories/users-factory";
import Joi from "joi";
import { AppError } from "../../../../app/errors/app-error";

export class UsersController {
  constructor(private usersFactory: UsersFactory) {}

  async list(request: Request, response: Response) {
    const listUsersService = this.usersFactory.createListUsersService();
    const users = await listUsersService.execute();

    return response.json(users);
  }

  async create(request: Request, response: Response) {
    const { error } = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      phone: Joi.string().required(),
      role: Joi.string().required(),
    }).validate(request.body);

    if (error) {
      throw new AppError(
        error.details.map((detail) => detail.message).join(", ")
      );
    }

    const createUserService = this.usersFactory.createCreateUserService();
    const user = await createUserService.execute(request.body);
    return response.status(201).json(user);
  }

  async update(request: Request, response: Response) {
    const bodySchema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
    });

    const paramsSchema = Joi.object({
      id: Joi.number().required(),
    });

    const { error: bodyError } = bodySchema.validate(request.body);
    const { error: paramsError } = paramsSchema.validate(request.params);

    if (bodyError || paramsError) {
      throw new AppError(
        [...(bodyError?.details || []), ...(paramsError?.details || [])]
          .map((detail) => detail.message)
          .join(", ")
      );
    }

    const { id } = request.params;
    const { name, email, phone } = request.body;

    const updateUserService = this.usersFactory.createUpdateUserService();

    await updateUserService.execute({
      id: Number(id),
      name,
      email,
      phone,
    });

    return response.status(204).send();
  }

  async delete(request: Request, response: Response) {
    const schema = Joi.object({
      id: Joi.number().required(),
    });

    const { error } = schema.validate(request.params);

    if (error) {
      throw new AppError(
        error.details.map((detail) => detail.message).join(", ")
      );
    }

    const { id } = request.params;
    const deleteUserService = this.usersFactory.createDeleteUserService();
    await deleteUserService.execute(Number(id));

    return response.status(204).send();
  }

  async show(request: Request, response: Response) {
    const schema = Joi.object({
      id: Joi.number().required(),
    });

    const { error } = schema.validate(request.params);

    if (error) {
      throw new AppError(
        error.details.map((detail) => detail.message).join(", ")
      );
    }

    const { id } = request.params;
    const getUserByIdService = this.usersFactory.createGetUserByIdService();
    const user = await getUserByIdService.execute(Number(id));

    return response.json(user);
  }

  async authenticate(request: Request, response: Response) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(request.body);

    if (error) {
      throw new AppError(
        error.details.map((detail) => detail.message).join(", ")
      );
    }

    const { email, password } = request.body;
    const authenticateUserService =
      this.usersFactory.createAuthenticateUserService();
    const token = await authenticateUserService.execute({ email, password });

    return response.json(token);
  }

  async resetPassword(request: Request, response: Response) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    const { error } = schema.validate(request.body);

    if (error) {
      throw new AppError(
        error.details.map((detail) => detail.message).join(", ")
      );
    }

    const { email } = request.body;
    const resetPasswordService = this.usersFactory.createResetPasswordService();
    await resetPasswordService.generateToken(email);
    await resetPasswordService.sendTokenByEmail(email);

    return response.status(204).send();
  }
}
