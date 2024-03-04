import { UsersRepository } from 'repositories/users-repository'
import { UserPhoneNumberExistsError } from './errors/user-already-exists.error'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  password: string
  phoneNumber?: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    password,
    phoneNumber,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const userWithSamePhoneNumber =
      await this.usersRepository.findByPhoneNumber(phoneNumber ?? '')

    if (userWithSamePhoneNumber) {
      throw new UserPhoneNumberExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      passwordHash,
      userPhoneNumber: phoneNumber ?? '',
    })

    return { user }
  }
}
