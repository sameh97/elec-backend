import { AppUtils } from "../app-utils";
import { injectable } from "inversify";
import { Product } from "../interfaces/product-interface";
import { ProductDto } from "../interfaces/product-dto";

@injectable()
export class ProductDtoMapper {
  public asDto(product: Product): ProductDto {
    if (!AppUtils.hasValue(product)) {
      return null;
    }
    return {
      _id: product._id,
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      categoryID: product.quantity,
      serialNumber: product.serialNumber,
    } as ProductDto;
  }

  public asEntity(productDto: ProductDto): Product {
    if (!AppUtils.hasValue(productDto)) {
      return null;
    }
    return {
      _id: productDto._id,
      name: productDto.name,
      description: productDto.description,
      quantity: productDto.quantity,
      categoryID: productDto.quantity,
      serialNumber: productDto.serialNumber,
    } as Product;
  }
}
