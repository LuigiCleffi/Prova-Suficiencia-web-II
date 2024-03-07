import { FastifyInstance } from 'fastify'
import { placeOrder } from './place-order.controller'
import { listOrders } from './list-orders.controller'
import { removeOrder } from './remove-order.controller'
import { updateOrder } from './update-order.controller'

export async function orderRoutes(app: FastifyInstance) {
  app.delete('/comanda/:id', removeOrder)
  app.post('/comanda', placeOrder)
  app.put('/comanda/:id', updateOrder)
  app.get('/comandas', listOrders)
}
