import { FastifyReply, FastifyRequest } from 'fastify'
import { UserDoesntExistError } from 'use-cases/errors/user-doesnt-exitst'
import { makeUserRemovalUseCase } from 'use-cases/factories/make-user-removal-use-case'
import { z } from 'zod'

export async function removeUser(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const userParamSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = userParamSchema.parse(request.params)

  try {
    const { removeUserUseCase } = makeUserRemovalUseCase()

    await removeUserUseCase.execute({ id })
  } catch (err) {
    if (err instanceof UserDoesntExistError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }

  return reply.status(201).send()
}
