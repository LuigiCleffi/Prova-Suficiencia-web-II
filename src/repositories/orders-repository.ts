import { Order, Prisma } from '@prisma/client'

export interface OrderRepository {
  placeOrder: (data: Prisma.OrderCreateInput) => Promise<Order>
  getProductById: (id: number) => Promise<Order | null>
}
