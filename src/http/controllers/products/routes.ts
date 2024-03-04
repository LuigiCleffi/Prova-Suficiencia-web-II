import { FastifyInstance } from 'fastify'
import { registerProduct } from './register-product.controller'
import { listProducts } from './list-products.controller'

export async function productRoutes(app: FastifyInstance) {
  app.post('/product', registerProduct)
  app.get('/products', listProducts)
}
