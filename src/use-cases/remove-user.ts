import { User } from '@prisma/client'
import { UsersRepository } from 'repositories/users-repository'
import { UserDoesntExistError } from './errors/user-doesnt-exitst'

interface RemoveUserUseCaseRequest {
  id: number
}

interface RemoveUserUseCaseResponse {
  user: User
}

export class RemoveUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    id,
  }: RemoveUserUseCaseRequest): Promise<RemoveUserUseCaseResponse> {
    const userExists = await this.userRepository.findUserById(id)

    if (!userExists) {
      throw new UserDoesntExistError()
    }

    const user = await this.userRepository.delete(id)

    return { user }
  }
}
