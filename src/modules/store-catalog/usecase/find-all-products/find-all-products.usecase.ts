import ProductGateway from "../../gateway/product.gateway";
import { FindAllProductOutputDto } from "./find-all-products.dto";



export default class FindAllProductsUseCase{
  constructor(private productRepository: ProductGateway){}

  async execute(): Promise<FindAllProductOutputDto> {
    try {
      const result = await this.productRepository.findAll();
      if(result.length == 0){ 
        console.error('consulta FindAllProducts nao retornou resultados');
      }
      return {
          products: result.map((product) => {
              return {
                  id: product.id.id,
                  name: product.name,
                  description: product.description,
                  salesPrice: product.salesPrice
              }
          })
      }
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        throw error;
      }
  }
}