import { UsersRepository } from 'repositories/users-repository'
import { UserPhoneNumberExistsError } from './errors/user-already-exists.error'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {

    const user = await this.usersRepository.findUserById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }


    return { user }
  }
}
