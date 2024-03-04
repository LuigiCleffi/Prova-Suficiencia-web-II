import { FastifyReply, FastifyRequest } from 'fastify'
import { UserPhoneNumberExistsError } from 'use-cases/errors/user-already-exists.error'
import { makeRegisterUseCase } from 'use-cases/factories/make-register-use-case'
import { z } from 'zod'

export async function register(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const registerBodySchema = z.object({
    name: z.string(),
    password: z.string().min(6),
    phoneNumber: z.string().optional(),
  })

  const { name, password, phoneNumber } = registerBodySchema.parse(request.body)

  try {
    const { registerUseCase } = makeRegisterUseCase()

    await registerUseCase.execute({ name, password, phoneNumber })
  } catch (err) {
    if (err instanceof UserPhoneNumberExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }

  return reply.status(201).send()
}
