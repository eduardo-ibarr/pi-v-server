import { MySQLProvider } from "../../../providers/database/mysql-provider";
import { ProductsRepository } from "../repositories/products-repository";
import { CreateProductService } from "../services/create-product";
import { DeleteProductService } from "../services/delete-product";
import { GetProductByIdService } from "../services/get-product-by-id";
import { ListProductsService } from "../services/list-products";
import { UpdateProductService } from "../services/update-product";

export class ProductsFactory {
  static makeGetProductByIdService() {
    return new GetProductByIdService(
      new ProductsRepository(new MySQLProvider())
    );
  }

  static makeCreateProductService() {
    return new CreateProductService(
      new ProductsRepository(new MySQLProvider())
    );
  }

  static makeUpdateProductService() {
    return new UpdateProductService(
      new ProductsRepository(new MySQLProvider())
    );
  }

  static makeDeleteProductService() {
    return new DeleteProductService(
      new ProductsRepository(new MySQLProvider())
    );
  }

  static makeListProductsService() {
    return new ListProductsService(new ProductsRepository(new MySQLProvider()));
  }
}
