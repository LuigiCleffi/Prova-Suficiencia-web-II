import { PrismaClient } from '@prisma/client'
import fastify, { FastifyInstance } from 'fastify'

const prisma = new PrismaClient()
const app: FastifyInstance = fastify()
interface IQueryInterface {
  username: string
  password: string
}
interface IHeaders {
  'x-access-token': string
}
interface IReply {
  code: number
  message: string
  body: unknown
}

app.get<{ QueryString: IQueryInterface; Headers: IHeaders; Reply: IReply }>(
  '/',
  async (request, reply) => {
    const { username, password } = request.query as IQueryInterface

    return reply.send({
      code: 200,
      message: 'Success',
      body: {
        username,
        password,
      },
    })
  },
)

app.post('/', async (request, reply) => {
  const { title, content, authorEmail } = request.body as {
    title: string
    content: string
    authorEmail: string
  }
  const post = await prisma.post.create({
    data: {
      title,
      content,
      published: false,
      author: { connect: { email: authorEmail } },
    },
  })

  reply.send({
    code: 200,
    message: 'Success',
    body: post,
  })
})

app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Server starting')
  console.log(`Server listening at ${address}`)
})
