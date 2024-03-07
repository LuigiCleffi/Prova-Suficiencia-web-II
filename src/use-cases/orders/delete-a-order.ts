import { Order } from '@prisma/client'
import { OrderRepository } from 'repositories/orders-repository'
import { OrderDoesntExistError } from 'use-cases/errors/orders/order-doesnt-exist'

interface RemoveOrderUseCaseRequest {
  id: number
}

interface RemoveOrderUseCaseResponse {
  order: Order
}

export class RemoveOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    id,
  }: RemoveOrderUseCaseRequest): Promise<RemoveOrderUseCaseResponse> {
    const doesOrderExist = await this.orderRepository.findOrderById(id)

    if (!doesOrderExist) {
      throw new OrderDoesntExistError()
    }

    const order = await this.orderRepository.delete(id)

    return { order }
  }
}
