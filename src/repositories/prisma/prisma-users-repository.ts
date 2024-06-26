import { prisma } from 'lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findUserById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }

  async listUsers() {
    const findAllUsers = await prisma.user.findMany()
    return findAllUsers
  }

  async findByPhoneNumber(userPhoneNumber: string) {
    const user = await prisma.user.findUnique({
      where: {
        userPhoneNumber,
      },
    })
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })
    return user
  }

  async delete(id: number) {
    await prisma.order.deleteMany({
      where: {
        userId: id,
      },
    })

    const user = await prisma.user.delete({
      where: {
        id,
      },
    })
    return user
  }
}
