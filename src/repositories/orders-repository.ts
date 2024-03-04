import { Order, Prisma } from '@prisma/client'

export interface OrderRepository {
  placeOrder: (data: Prisma.OrderCreateInput) => Promise<Order>
  // listOrders: () => Promise<Order[] | null>
  // getProductById: (id: number) => Promise<Order | null>
}
