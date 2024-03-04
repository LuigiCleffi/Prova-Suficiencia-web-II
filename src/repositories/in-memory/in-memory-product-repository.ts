import { Prisma, Product } from '@prisma/client'
import { ProductsRepository } from 'repositories/products-repository'

export class InMemoryProductRepository implements ProductsRepository {
  public items: Product[] = []

  async create(product_data: Prisma.ProductCreateInput): Promise<Product> {
    const product = {
      id: 1,
      name: product_data.name,
      price: product_data.price,
    }
    this.items.push(product)
    return product
  }

  async listProducts() {
    return this.items
  }

  async findProductByName(name: string) {
    const product = this.items.find((product) => product.name === name)
    if (!product) return null
    return product
  }
}
