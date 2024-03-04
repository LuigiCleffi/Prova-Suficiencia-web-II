import { Order, Prisma } from '@prisma/client'
import { OrderRepository } from 'repositories/orders-repository'
import { UserAndProductIdShouldExistError } from 'use-cases/errors/orders/user-and-product-id-should-exist'

export class InMemoryOrdersRepository implements OrderRepository {
  public items: Order[] = []

  async listUsers() {
    return this.items
  }

  async getProductById(productId: number): Promise<Order | null> {
    const order = this.items.find((order) => order.productId === productId)
    if (!order) return null
    return order
  }

  async placeOrder(data: Prisma.OrderCreateInput): Promise<Order> {
    const userId = data.user.connect?.id
    const productId = data.product.connect?.id

    if (typeof userId === 'undefined' || typeof productId === 'undefined') {
      throw new UserAndProductIdShouldExistError()
    }

    const order = {
      id: this.items.length + 1,
      userId,
      productId,
    }

    this.items.push(order)
    return order
  }
}
