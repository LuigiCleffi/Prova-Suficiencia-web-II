import { PrismaOrdersRepository } from 'repositories/prisma/prisma-order-repository'
import { UpdateOrderUseCase } from 'use-cases/orders/update-a-order'

export function makeOrderUpdateUseCase() {
  const orderRepository = new PrismaOrdersRepository()

  const updateOrderUseCase = new UpdateOrderUseCase(orderRepository)

  return { updateOrderUseCase }
}
