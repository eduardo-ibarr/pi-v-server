import { ICategoriesRepository } from "../models/categories-repository";
import { CreateCategoryDTO } from "../models/dtos/create-category-dto";
import { AppError } from "../../../app/errors/app-error";

export class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(data: CreateCategoryDTO): Promise<void> {
    try {
      await this.categoriesRepository.create(data);
    } catch (error) {
      console.log(error);
      throw new AppError("Erro ao criar categoria.", 500);
    }
  }
}
