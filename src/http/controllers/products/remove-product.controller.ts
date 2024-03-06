import { FastifyReply, FastifyRequest } from 'fastify'
import { ProductDoesntExistsError } from 'use-cases/errors/products/product-doesnt-exist'
import { makeProductRemovalUseCase } from 'use-cases/factories/make-product-removal-use-case'
import { z } from 'zod'

export async function removeProduct(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const productBodySchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = productBodySchema.parse(request.params)

  try {
    const { removeProductUseCase } = makeProductRemovalUseCase()

    await removeProductUseCase.execute({ id })
  } catch (err) {
    if (err instanceof ProductDoesntExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }

  return reply.status(201).send({
    message: 'Product removed successfully',
  })
}
