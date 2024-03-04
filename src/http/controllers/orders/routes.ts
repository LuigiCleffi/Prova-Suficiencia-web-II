import { FastifyInstance } from 'fastify'
import { placeOrder } from './place-order'

export async function orderRoutes(app: FastifyInstance) {
  app.post('/place-order', placeOrder)
}
