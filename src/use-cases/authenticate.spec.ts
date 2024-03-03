import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { AuthenticationUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialError } from './errors/invalid-credential.error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticationUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticationUseCase(usersRepository)
  })
  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      userPhoneNumber: '47999999',
      passwordHash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      phoneNumber: '47999999',
      password: '123456',
    })

    expect(user.userId).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with wrong phoneNumber', async () => {

    expect(() =>
      sut.execute({
        phoneNumber: '123456',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

})
