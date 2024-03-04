import { FastifyReply, FastifyRequest } from 'fastify'
import { ProductAlreadyExistsError } from 'use-cases/errors/products/product-already-exists'
import { makeRegisterProductUseCase } from 'use-cases/factories/make-register-product-use-case'
import { z } from 'zod'

export async function registerProduct(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const registerBodySchema = z.object({
    name: z.string(),
    price: z.number(),
  })

  const { name, price } = registerBodySchema.parse(request.body)

  try {
    const { registerProductUseCase } = makeRegisterProductUseCase()

    await registerProductUseCase.execute({ name, price })
  } catch (err) {
    if (err instanceof ProductAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }

  return reply.status(201).send()
}
