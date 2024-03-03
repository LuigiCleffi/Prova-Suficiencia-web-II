import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { UserPhoneNumberExistsError } from './errors/user-already-exists.error'


let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register use case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      password: 'password',
      phoneNumber: '1234567890'
    })

    expect(user.userId).toEqual(expect.any(String))
  })
  it('should hash user password upon registration', async () => {

    const { user } = await sut.execute({
      name: 'John Doe',
      password: 'password',
      phoneNumber: '1234567890'
    })

    const isHashCorrectlyHashed = await compare('password', user.passwordHash)
    expect(isHashCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same phone number already registered', async () => {

    const phoneNumber = '1234567890'

    await sut.execute({
      name: 'John Doe',
      password: 'password',
      phoneNumber
    })

    await expect(() => sut.execute({
      name: 'John Doe',
      password: 'password',
      phoneNumber
    })).rejects.toBeInstanceOf(UserPhoneNumberExistsError)
  })
})
