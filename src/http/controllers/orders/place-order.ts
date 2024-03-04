import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAndProductIdShouldExistError } from 'use-cases/errors/orders/user-and-product-id-should-exist'
import { makeOrderUseCase } from 'use-cases/factories/make-order-use-case'
import { z } from 'zod'

export async function placeOrder(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const placeOrderBodySchema = z.object({
    userId: z.number(),
    productId: z.number(),
  })

  const { productId, userId } = placeOrderBodySchema.parse(request.body)

  try {
    const { orderUseCase } = makeOrderUseCase()

    await orderUseCase.createOrder({ productId, userId })
  } catch (err) {
    if (err instanceof UserAndProductIdShouldExistError) {
      return reply.status(409).send({
        message: err.message,
      })
    }
    throw err
  }

  return reply.status(201).send()
}
