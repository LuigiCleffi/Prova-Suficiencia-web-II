import { UsersRepository } from 'repositories/users-repository'
import { InvalidCredentialError } from './errors/invalid-credential.error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticationUseCaseRequest {
  phoneNumber: string
  password: string
}

interface AuthenticationUseCaseResponse {
  user: User
}

export class AuthenticationUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    phoneNumber,
    password,
  }: AuthenticationUseCaseRequest): Promise<AuthenticationUseCaseResponse> {
    const user = await this.usersRepository.findByPhoneNumber(phoneNumber)
    if (!user) {
      throw new InvalidCredentialError()
    }
    const doesPasswordMatches = await compare(password, user.passwordHash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialError()
    }

    return { user }
  }
}
