import { Request, Response } from "express";
import { ProductsFactory } from "../../factories/products-factory";
import { IValidationProvider } from "../../../../providers/validation/models/validation-provider";
import { createProductSchema } from "../../models/schemas/create-product-schema";
import { updateProductSchema } from "../../models/schemas/update-product-schema";
import { paramsSchema } from "../../models/schemas/params-schema";
import { queryListProductsSchema } from "../../models/schemas/query-list-products-schema";

export class ProductsController {
  constructor(
    private productsFactory: typeof ProductsFactory,
    private readonly validationProvider: IValidationProvider
  ) {}

  async list(request: Request, response: Response) {
    await this.validationProvider.validate(
      request.query,
      queryListProductsSchema
    );

    const listProductsService = this.productsFactory.makeListProductsService();
    const products = await listProductsService.execute(request.query);

    return response.json(products);
  }

  async create(request: Request, response: Response) {
    await this.validationProvider.validate(request.body, createProductSchema);

    const createProductService =
      this.productsFactory.makeCreateProductService();
    const product = await createProductService.execute(request.body);

    return response.status(201).json(product);
  }

  async update(request: Request, response: Response) {
    await this.validationProvider.validate(request.body, updateProductSchema);
    await this.validationProvider.validate(request.params, paramsSchema);

    const { id } = request.params;
    const updateProductService =
      this.productsFactory.makeUpdateProductService();

    await updateProductService.execute({
      id: Number(id),
      ...request.body,
    });

    return response.status(204).send();
  }

  async delete(request: Request, response: Response) {
    await this.validationProvider.validate(request.params, paramsSchema);

    const { id } = request.params;
    const deleteProductService =
      this.productsFactory.makeDeleteProductService();

    await deleteProductService.execute(Number(id));

    return response.status(204).send();
  }

  async show(request: Request, response: Response) {
    await this.validationProvider.validate(request.params, paramsSchema);

    const { id } = request.params;
    const getProductByIdService =
      this.productsFactory.makeGetProductByIdService();
    const product = await getProductByIdService.execute(Number(id));

    return response.json(product);
  }
}
