import { FastifyReply, FastifyRequest } from 'fastify'
import { registerUseCase } from 'use-cases/register'
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
    await registerUseCase({ name, password, phoneNumber })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
