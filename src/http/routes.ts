import { FastifyInstance } from 'fastify'
import { register } from './controllers/register.controller'
import { listUsers } from './controllers/list-users.controller'
import { authenticate } from './controllers/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/user', register),
    app.post('/session', authenticate),
    app.get('/users', listUsers)
}
