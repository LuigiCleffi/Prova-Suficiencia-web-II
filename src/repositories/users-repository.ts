import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create: (data: Prisma.UserCreateInput) => Promise<User>
  findByPhoneNumber: (phoneNumber: string) => Promise<User | null>
  listUsers: () => Promise<User[] | null>
  findUserById: (id: number) => Promise<User | null>
}
