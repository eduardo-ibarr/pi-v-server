import { Request, Response } from "express";
import { CategoriesFactory } from "../../factories/categories-factory";
import { IValidationProvider } from "../../../../providers/validation/models/validation-provider";
import { createCategorySchema } from "../../models/schemas/create-category-schema";
import { updateCategorySchema } from "../../models/schemas/update-category-schema";
import { paramsSchema } from "../../models/schemas/params-schema";

export class CategoriesController {
  constructor(
    private categoriesFactory: typeof CategoriesFactory,
    private readonly validationProvider: IValidationProvider
  ) {}

  async list(request: Request, response: Response) {
    const listCategoriesService =
      this.categoriesFactory.makeListCategoriesService();
    const categories = await listCategoriesService.execute();

    return response.json(categories);
  }

  async create(request: Request, response: Response) {
    await this.validationProvider.validate(request.body, createCategorySchema);

    const createCategoryService =
      this.categoriesFactory.makeCreateCategoryService();
    const category = await createCategoryService.execute(request.body);

    return response.status(201).json(category);
  }

  async update(request: Request, response: Response) {
    await this.validationProvider.validate(request.body, updateCategorySchema);
    await this.validationProvider.validate(request.params, paramsSchema);

    const { id } = request.params;
    const updateCategoryService =
      this.categoriesFactory.makeUpdateCategoryService();

    await updateCategoryService.execute({
      id: Number(id),
      ...request.body,
    });

    return response.status(204).send();
  }

  async delete(request: Request, response: Response) {
    await this.validationProvider.validate(request.params, paramsSchema);

    const { id } = request.params;
    const deleteCategoryService =
      this.categoriesFactory.makeDeleteCategoryService();

    await deleteCategoryService.execute(Number(id));

    return response.status(204).send();
  }

  async show(request: Request, response: Response) {
    await this.validationProvider.validate(request.params, paramsSchema);

    const { id } = request.params;
    const getCategoryByIdService =
      this.categoriesFactory.makeGetCategoryByIdService();
    const category = await getCategoryByIdService.execute(Number(id));

    return response.json(category);
  }
}
