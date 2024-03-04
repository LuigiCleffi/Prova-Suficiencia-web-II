import { FastifyInstance } from 'fastify'
import { register } from './register.controller'
import { listUsers } from './list-users.controller'
import { authenticate } from './authenticate'

export async function userRoutes(app: FastifyInstance) {
  app.post('/user', register)
  app.post('/session', authenticate)
  app.get('/users', listUsers)
}
