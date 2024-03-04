import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from 'repositories/prisma/prisma-users-repository'

export async function listUsers(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  try {
    const userRepository = new PrismaUsersRepository()
    const users = await userRepository.listUsers()

    reply.send(users)
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(500).send({
        message: err.message,
      })
    }
  }
}
