import { Product } from '@prisma/client'
import { ProductsRepository } from 'repositories/products-repository'
import { ProductDoesntExistsError } from 'use-cases/errors/products/product-doesnt-exist'

interface RemoveProductUseCaseRequest {
  id: number
}

interface RemoveProductUseCaseResponse {
  product: Product
}

export class RemoveProductUseCase {
  constructor(private productRepository: ProductsRepository) {}

  async execute({
    id,
  }: RemoveProductUseCaseRequest): Promise<RemoveProductUseCaseResponse> {
    const productExists = await this.productRepository.findProductById(id)

    if (!productExists) {
      throw new ProductDoesntExistsError()
    }

    const product = await this.productRepository.delete(id)

    return { product }
  }
}
