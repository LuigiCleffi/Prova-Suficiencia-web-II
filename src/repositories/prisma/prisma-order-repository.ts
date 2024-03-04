import { prisma } from 'lib/prisma'
import { Prisma } from '@prisma/client'
import { OrderRepository } from 'repositories/orders-repository'

export class PrismaOrdersRepository implements OrderRepository {
  // getProductById(id: number) {
  //   console.log('HERE')
  //   return prisma.order.findUnique({
  //     where: { id },
  //   })
  // }

  async listOrders() {
    const findAllOrders = await prisma.order.findMany()
    return findAllOrders
  }

  async placeOrder(data: Prisma.OrderCreateInput) {
    const order = await prisma.order.create({ data })
    return order
  }
}
