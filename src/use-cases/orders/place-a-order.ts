import { Order, Product, User } from '@prisma/client'
import { OrderRepository } from 'repositories/orders-repository'
import { OrderExistsError } from 'use-cases/errors/orders/order-doesnt-exist'

interface OrderUseCaseRequest {
  userId: number
  productIds: number[] | number
}

interface OrderUseCaseResponse {
  order: Order
  user: User
  products: Product[]
}

export class PlaceAnOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async createOrder({
    productIds,
    userId,
  }: OrderUseCaseRequest): Promise<OrderUseCaseResponse> {
    const user = await this.orderRepository.findUserById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    const orderExists = await this.orderRepository.verifyOrderExists(userId)

    if (orderExists) {
      throw new OrderExistsError()
    }

    const order = await this.orderRepository.placeOrder(userId, productIds)

    const products = await this.orderRepository.getProductsForOrder(order.id)

    return {
      order,
      user,
      products: products ?? [],
    }
  }
}
