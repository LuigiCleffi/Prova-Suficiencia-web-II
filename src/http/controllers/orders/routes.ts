import { FastifyInstance } from 'fastify'
import { placeOrder } from './place-order'
import { listOrders } from './list-orders.controller'

export async function orderRoutes(app: FastifyInstance) {
  app.post('/comanda', placeOrder)
  app.get('/comandas', listOrders)
}
