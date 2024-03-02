import { FastifyInstance } from 'fastify'
import { register } from 'http/controllers/register.controller'

export async function Usuario(app: FastifyInstance) {
  app.post('/user', register)
}
