import { Order, Product, User } from '@prisma/client'

export interface OrderRepository {
  placeOrder: (userId: number, productIds: number[] | number) => Promise<Order>

  findUserById: (userId: number) => Promise<User | null>
  verifyOrderExists: (userId: number) => Promise<Order | null>

  getProductsForOrder: (orderId: number) => Promise<Product[] | null>
}
