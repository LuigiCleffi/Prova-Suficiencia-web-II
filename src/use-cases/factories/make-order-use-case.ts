import { PrismaOrdersRepository } from 'repositories/prisma/prisma-order-repository'
import { PlaceAnOrderUseCase } from 'use-cases/orders/place-a-order'

export function makeOrderUseCase() {
  const orderRepository = new PrismaOrdersRepository()

  const orderUseCase = new PlaceAnOrderUseCase(orderRepository)

  return { orderUseCase }
}
