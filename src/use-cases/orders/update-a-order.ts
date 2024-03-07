import { Order, Product, User } from '@prisma/client'
import { OrderRepository } from 'repositories/orders-repository'
import { OrderDoesntExistError } from 'use-cases/errors/orders/order-doesnt-exist'
import { UserDoesntExistError } from 'use-cases/errors/user-doesnt-exitst'

interface UpdateOrderUseCaseRequest {
  userId: number
  productIds: number[] | number
}

interface UpdateOrderUseCaseResponse {
  order: Order
  user: User
  products: Product[]
}

export class UpdateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async updateOrder({
    productIds,
    userId,
  }: UpdateOrderUseCaseRequest): Promise<UpdateOrderUseCaseResponse> {
    const user = await this.orderRepository.findUserById(userId)

    if (!user) {
      throw new UserDoesntExistError()
    }

    const orderExists = await this.orderRepository.verifyOrderExists(userId)

    if (!orderExists) {
      throw new OrderDoesntExistError()
    }

    const order = await this.orderRepository.updateOrder(userId, productIds)

    const products = await this.orderRepository.getProductsForOrder(order.id)

    return {
      order,
      user,
      products: products ?? [],
    }
  }
}
