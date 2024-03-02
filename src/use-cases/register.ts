import { hash } from 'bcryptjs'
import { prisma } from 'lib/prisma'
import { PrismaUserRepository } from 'repositories/prisma-users-repository'

interface RegisterUseCaseRequest {
  name: string
  password: string
  phoneNumber?: string
}

export async function registerUseCase({
  name,
  password,
  phoneNumber,
}: RegisterUseCaseRequest) {
  const passwordHash = await hash(password, 6)

  const userWithSamePhoneNumber = await prisma.user.findUnique({
    where: {
      userPhoneNumber: phoneNumber,
    },
  })

  if (userWithSamePhoneNumber) {
    throw new Error('User with same phone number already exists')
  }

  const prismaUsersRepository = new PrismaUserRepository()

  await prismaUsersRepository.create({
    name,
    passwordHash,
    userPhoneNumber: phoneNumber ?? '',
  })
}
