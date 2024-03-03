import { User } from '@prisma/client'
import { ProductsRepository } from 'repositories/products-repository'

interface RegisterProductUseCaseRequest {
  name: string
  price: number,
  productUserId: string,
  user: User
} 

export class RegisterProductUseCase {
  constructor(private usersProducts: ProductsRepository) {}

  async execute({ name, user, price, productUserId }: RegisterProductUseCaseRequest) {
   
    await this.usersProducts.create({
      name,
      price,
      user: {
        connect: {
         userId: productUserId
        }
      },
    })
  }
}
