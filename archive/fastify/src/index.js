const fastify = require('fastify')()
// require('dotenv').config()
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME
const DB_PORT = process.env.DB_PORT

console.log(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`)

fastify.register(
  require('@fastify/postgres'),
  {
    connectionString: `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  },
  { logger: true }
)

fastify.get('/unique-event-names', (req, reply) => {
  console.log('calling: unique-event-names')
  fastify.pg.query('SELECT DISTINCT name FROM event;', [], function onResult(err, result) {
    reply.send(err || result)
  })
})

fastify.listen({ port: 3050, host: '::' }, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`server listening on ${fastify.server.address().port}`)
})
