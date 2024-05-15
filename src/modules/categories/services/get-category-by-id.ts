import { AppError } from "../../../app/errors/app-error";
import { Category } from "../models/category";
import { ICategoriesRepository } from "../models/categories-repository";

export class GetCategoryByIdService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(id: number): Promise<Category | null> {
    try {
      const category = await this.categoriesRepository.findById(id);

      if (!category) {
        throw new AppError("Categoria não encontrada.", 404);
      }

      return category;
    } catch (error) {
      console.error(error);
      throw new AppError("Erro ao buscar categoria por ID.", 500);
    }
  }
}
