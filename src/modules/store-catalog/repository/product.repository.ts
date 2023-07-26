import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();

    return products.map(
      (product) =>
        new Product({
          id: new Id(product.id),
          name: product.name,
          description: product.description,
          salesPrice: product.purchasePrice,
        })
    );
  }
  async find(id: string): Promise<Product> {
    console.log('Buscando produto com ID:', id);

    try {
      const product = await ProductModel.findOne({
        where: {
          id: id,
        },
      });

      console.log('Produto encontrado:', product);
      return new Product({
        id: new Id(product.id),
        name: product.name,
        description: product.description,
        salesPrice: product.purchasePrice,
      });
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw error;
    }
  }
}
