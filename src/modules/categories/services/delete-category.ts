import { AppError } from "../../../app/errors/app-error";
import { ICategoriesRepository } from "../models/categories-repository";

export class DeleteCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(id: number): Promise<void> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError("Categoria não encontrada.", 404);
    }

    try {
      await this.categoriesRepository.softDelete(id);
    } catch (error) {
      console.error(error);
      throw new AppError("Erro ao deletar categoria.", 500);
    }
  }
}
