import { env } from 'env'
import fastify, { FastifyInstance } from 'fastify'
import { appRoutes } from 'http/routes'

const app: FastifyInstance = fastify()

app.register(appRoutes)

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then((value) => {
    console.log(`🚀 HTTP Server Running ${value}`)
  })
