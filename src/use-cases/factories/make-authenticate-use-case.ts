import { PrismaUsersRepository } from "repositories/prisma/prisma-users-repository"
import { AuthenticationUseCase } from "use-cases/authenticate"
import { RegisterUseCase } from "use-cases/register"

export function makeAuthenticateUseCase() {
  const userRepository = new PrismaUsersRepository()

  const authenticateUseCase = new AuthenticationUseCase(
    userRepository
  )

  return { authenticateUseCase }
}