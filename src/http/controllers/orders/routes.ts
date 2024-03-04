import { FastifyInstance } from 'fastify'
import { placeOrder } from './place-order'
import { listOrders } from './list-orders.controller'

export async function orderRoutes(app: FastifyInstance) {
  app.post('/place-order', placeOrder)
  app.get('/orders', listOrders)
}
