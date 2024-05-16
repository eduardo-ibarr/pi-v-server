import { AppError } from "../../../app/errors/app-error";
import { UpdateCategoryDTO } from "../models/dtos/update-category-dto";
import { Category } from "../models/category";
import { ICategoriesRepository } from "../models/categories-repository";

export class UpdateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(data: UpdateCategoryDTO): Promise<Category> {
    const category = await this.categoriesRepository.findById(data.id);

    if (!category) {
      throw new AppError("Categoria não encontrada.", 404);
    }

    const updatedCategory = await this.categoriesRepository.update(
      data.id,
      data
    );

    return updatedCategory;
  }
}
