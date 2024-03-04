import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaOrdersRepository } from 'repositories/prisma/prisma-order-repository'

export async function listOrders(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  try {
    const orderRepository = new PrismaOrdersRepository()
    const orders = await orderRepository.listOrders()

    reply.send(orders)
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(500).send({
        message: err.message,
      })
    }
  }
}
