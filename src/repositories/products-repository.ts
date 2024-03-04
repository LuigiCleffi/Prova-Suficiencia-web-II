import { Prisma, Product, User } from "@prisma/client";

export interface ProductsRepository {
  create: (data: Prisma.ProductCreateInput) => Promise<Product>,
  listProducts: () => Promise<Product[] | null>
  findProductByName: (name: string) => Promise<Product | null>
}
