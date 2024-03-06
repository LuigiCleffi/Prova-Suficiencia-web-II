import { prisma } from 'lib/prisma'
import { Prisma } from '@prisma/client'
import { ProductsRepository } from 'repositories/products-repository'

export class PrismaProductsRepository implements ProductsRepository {
  async create(data: Prisma.ProductCreateInput) {
    const product = await prisma.product.create({ data })
    return product
  }

  async delete(id: number) {
    const product = await prisma.product.delete({
      where: {
        id,
      },
    })
    return product
  }

  async listProducts() {
    const findAllProducts = await prisma.product.findMany()
    return findAllProducts
  }

  async findProductByName(name: string) {
    const products = await prisma.product.findFirst({
      where: {
        name,
      },
    })
    return products
  }

  async findProductById(id: number) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    })
    return product
  }
}
