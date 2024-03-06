import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaOrdersRepository } from 'repositories/prisma/prisma-order-repository'

export async function listOrders(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  try {
    const orderRepository = new PrismaOrdersRepository()
    const orders = await orderRepository.listOrders()

    const ordersWithUserDetailsAndProducts = await Promise.all(
      orders.map(async (order) => {
        const user = await orderRepository.findUserById(order.userId)
        const products = await orderRepository.getProductsForOrder(order.id)

        return {
          ...order,
          userId: order.userId,
          userName: user?.name ?? '',
          userPhoneNumber: user?.userPhoneNumber ?? '',
          products: products ?? [],
        }
      }),
    )
    reply.send(ordersWithUserDetailsAndProducts)
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(500).send({
        message: err.message,
      })
    }
  }
}
