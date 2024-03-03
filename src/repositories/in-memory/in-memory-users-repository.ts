import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "repositories/users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public itens: User[] = []

  async findUserById(id: string): Promise<User | null> {
    const user = this.itens.find(user => user.userId === id)
    if (!user) return null
    return user;
  }
  async listUsers() {
    return this.itens
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const user = this.itens.find(user => user.userPhoneNumber === phoneNumber)
    if (!user) return null
    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      userId: 'user-1',
      name: data.name,
      passwordHash: data.passwordHash,
      userPhoneNumber: data.userPhoneNumber,
      createdAt: new Date()
    };
    this.itens.push(user);
    return user;
  }
}