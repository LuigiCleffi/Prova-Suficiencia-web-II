import { FastifyReply, FastifyRequest } from 'fastify'
import { OrderDoesntExistError } from 'use-cases/errors/orders/order-doesnt-exist'
import { makeOrderRemovalUseCase } from 'use-cases/factories/make-order-removal-use-case'
import { z } from 'zod'

export async function removeOrder(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const orderBodySchema = z.object({
    id: z.coerce.number(),
  })
  await request.jwtVerify()

  const { id } = orderBodySchema.parse(request.params)

  try {
    const { orderRemovalUseCase } = makeOrderRemovalUseCase()

    await orderRemovalUseCase.execute({ id })
  } catch (err) {
    if (err instanceof OrderDoesntExistError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }

  return reply.status(204).send({
    message: 'Order removed successfully',
  })
}
