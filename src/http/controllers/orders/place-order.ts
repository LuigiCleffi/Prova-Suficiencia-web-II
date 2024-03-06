import { FastifyReply, FastifyRequest } from 'fastify'
import { OrderExistsError } from 'use-cases/errors/orders/order-doesnt-exist'
import { makeOrderUseCase } from 'use-cases/factories/make-order-use-case'
import { z } from 'zod'

export async function placeOrder(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  await request.jwtVerify()

  const placeOrderBodySchema = z.object({
    userId: z.number(),
    productIds: z.union([z.array(z.coerce.number()), z.coerce.number()]),
  })

  const { productIds, userId } = placeOrderBodySchema.parse(request.body)

  try {
    const { orderUseCase } = makeOrderUseCase()

    await orderUseCase.createOrder({ productIds, userId })
  } catch (err) {
    if (err instanceof OrderExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }
    throw err
  }

  return reply.status(201).send({
    message: 'Order placed successfully',
  })
}
