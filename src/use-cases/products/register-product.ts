import { Product } from '@prisma/client'
import { ProductsRepository } from 'repositories/products-repository'
import { ProductAlreadyExistsError } from 'use-cases/errors/products/product-already-exists'

interface ProductUseCaseRequest {
  name: string
  price: number
}

interface ProductUseCaseResponse {
  product: Product
}

export class RegisterProductUseCase {
  constructor(private productRepository: ProductsRepository) {}

  async execute({
    name,
    price,
  }: ProductUseCaseRequest): Promise<ProductUseCaseResponse> {
    const isRepeatedProduct =
      await this.productRepository.findProductByName(name)

    if (isRepeatedProduct) {
      throw new ProductAlreadyExistsError()
    }

    const product = await this.productRepository.create({
      name,
      price,
    })

    return { product }
  }
}
