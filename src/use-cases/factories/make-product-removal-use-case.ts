import { PrismaProductsRepository } from 'repositories/prisma/prisma-product-repository'
import { RemoveProductUseCase } from 'use-cases/products/remove-product'

export function makeProductRemovalUseCase() {
  const productRepository = new PrismaProductsRepository()

  const removeProductUseCase = new RemoveProductUseCase(productRepository)
  return { removeProductUseCase }
}
