import { prisma } from 'lib/prisma'
import { OrderRepository } from 'repositories/orders-repository'

export class PrismaOrdersRepository implements OrderRepository {
  async verifyOrderExists(userId: number) {
    const foundOrder = await prisma.order.findUnique({
      where: {
        userId,
      },
      include: {
        products: true,
      },
    })

    return foundOrder ?? null
  }

  async findUserById(userId: number) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    return user
  }

  async getProductsForOrder(orderId: number) {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        products: true,
      },
    })
    return order?.products ?? []
  }

  async listOrders() {
    const findAllOrders = await prisma.order.findMany()
    return findAllOrders
  }

  async delete(orderId: number) {
    const order = await prisma.order.delete({
      where: {
        id: orderId,
      },
    })

    return order
  }

  async findOrderById(id: number) {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    })

    return order
  }

  async placeOrder(userId: number, productIds: number[] | number) {
    const order = await prisma.order.create({
      data: {
        userId,
        products: {
          connect: Array.isArray(productIds)
            ? productIds.map((id) => ({ id }))
            : [{ id: productIds }],
        },
      },
    })

    return order
  }

  async updateOrder(userId: number, productIds: number[] | number) {
    const order = await prisma.order.update({
      where: {
        userId,
      },
      data: {
        products: {
          connect: Array.isArray(productIds)
            ? productIds.map((id) => ({ id }))
            : [{ id: productIds }],
        },
      },
    })

    return order
  }
}
