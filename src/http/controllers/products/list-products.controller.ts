import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaProductsRepository } from 'repositories/prisma/prisma-product-repository'

export async function listProducts(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  try {
    const productRepository = new PrismaProductsRepository()
    const products = await productRepository.listProducts()

    reply.send(products)
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(500).send({
        message: err.message,
      })
    }
  }
}
