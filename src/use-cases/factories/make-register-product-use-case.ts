import { PrismaProductsRepository } from 'repositories/prisma/prisma-product-repository'
import { RegisterProductUseCase } from 'use-cases/products/register-product'

export function makeRegisterProductUseCase() {
  const productRepository = new PrismaProductsRepository()

  const registerProductUseCase = new RegisterProductUseCase(productRepository)
  return { registerProductUseCase }
}
