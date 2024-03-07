import { PrismaOrdersRepository } from 'repositories/prisma/prisma-order-repository'
import { RemoveOrderUseCase } from 'use-cases/orders/delete-a-order'

export function makeOrderRemovalUseCase() {
  const orderRepository = new PrismaOrdersRepository()

  const orderRemovalUseCase = new RemoveOrderUseCase(orderRepository)

  return { orderRemovalUseCase }
}
