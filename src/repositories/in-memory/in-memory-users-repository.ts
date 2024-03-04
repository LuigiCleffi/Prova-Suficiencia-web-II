import { Prisma, User } from '@prisma/client'
import { UsersRepository } from 'repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findUserById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id === id)
    if (!user) return null
    return user
  }

  async listUsers() {
    return this.items
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const user = this.items.find((user) => user.userPhoneNumber === phoneNumber)
    if (!user) return null
    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: 'user-1',
      name: data.name,
      passwordHash: data.passwordHash,
      userPhoneNumber: data.userPhoneNumber,
      createdAt: new Date(),
    }
    this.items.push(user)
    return user
  }
}
