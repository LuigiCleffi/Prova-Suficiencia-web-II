import { PrismaUsersRepository } from 'repositories/prisma/prisma-users-repository'
import { RemoveUserUseCase } from 'use-cases/remove-user'

export function makeUserRemovalUseCase() {
  const userRepository = new PrismaUsersRepository()

  const removeUserUseCase = new RemoveUserUseCase(userRepository)
  return { removeUserUseCase }
}
