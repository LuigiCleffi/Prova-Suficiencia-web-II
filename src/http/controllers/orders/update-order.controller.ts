import { FastifyReply, FastifyRequest } from 'fastify'
import { OrderDoesntExistError } from 'use-cases/errors/orders/order-doesnt-exist'
import { makeOrderUpdateUseCase } from 'use-cases/factories/make-order-update-use-case'
import { z } from 'zod'

export async function updateOrder(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const updateOrderBodySchema = z.object({
    userId: z.coerce.number(),
    productIds: z.union([z.array(z.coerce.number()), z.coerce.number()]),
  })

  await request.jwtVerify()

  const { productIds, userId } = updateOrderBodySchema.parse(request.body)

  try {
    const { updateOrderUseCase } = makeOrderUpdateUseCase()
    await updateOrderUseCase.updateOrder({ productIds, userId })
  } catch (err) {
    if (err instanceof OrderDoesntExistError) {
      return reply.status(409).send({
        message: err.message,
      })
    }
    throw err
  }

  return reply.status(200).send()
}
