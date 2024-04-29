import { AppError } from "../../app/errors/app-error";
import { IValidationProvider } from "./models/validation-provider";

export class JoiProvider implements IValidationProvider {
  async validate(data: any, schema: any): Promise<void> {
    const { error } = schema.validate(data);

    if (error) {
      throw new AppError(
        error.details.map((detail: any) => detail.message).join(", ")
      );
    }

    return;
  }
}
