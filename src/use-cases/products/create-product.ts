import { Product, User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { ProductsRepository } from 'repositories/products-repository'
import { ProductAlreadyExistsError } from 'use-cases/errors/products/product-already-exists'

interface ProductUseCaseRequest {
  name: string
  price: number
  userId: string
}

interface ProductUseCaseResponse {
  product: Product
}

export class RegisterUseCase {
  constructor(private productRepository: ProductsRepository) { }

  async execute({ name, price, userId }: ProductUseCaseRequest): Promise<ProductUseCaseResponse> {
    const isRepeatedProduct = await this.productRepository.findProductByName(name);

    if (isRepeatedProduct) {
      throw new ProductAlreadyExistsError();
    }

    const product = await this.productRepository.create({
      name,
      price,
      user: {
        connect: {
          userId: userId,
        },
      },
    });

    return { product };
  }
}
