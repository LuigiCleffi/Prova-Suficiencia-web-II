import { Prisma, Product } from '@prisma/client'

export interface ProductsRepository {
  create: (data: Prisma.ProductCreateInput) => Promise<Product>
  listProducts: () => Promise<Product[] | null>
  findProductByName: (name: string) => Promise<Product | null>
  findProductById: (id: number) => Promise<Product | null>
  delete: (id: number) => Promise<Product>
}
