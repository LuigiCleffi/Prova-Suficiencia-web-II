import { env } from 'env'
import fastify, { FastifyInstance } from 'fastify'

import { ZodError } from 'zod'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { swaggerOptions, swaggerUiOptions } from 'swagger'

import { userRoutes } from 'http/controllers/users/routes'
import { productRoutes } from 'http/controllers/products/routes'
import { orderRoutes } from 'http/controllers/orders/routes'
import fastifyJwt from '@fastify/jwt'

export const app: FastifyInstance = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifySwagger, swaggerOptions)
app.register(fastifySwaggerUi, swaggerUiOptions)

app.register(userRoutes)
app.register(orderRoutes)
app.register(productRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({
    message: 'Internal Server Error',
  })
})
