import { createServer, IncomingMessage, ServerResponse } from 'http'
import { validate as uuidValidate } from 'uuid'
import 'dotenv/config'
import * as _ from './controller/user'

const PORT: number = parseInt(process.env.NODE_ENV === 'production' ? (process.env.PORT_PROD as string) : (process.env.PORT_DEV as string), 10) || 4000

if (!PORT) {
  console.error('Error to get ports')
  process.exit(1)
}

createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const uuid = req.url!.split('/')[3]
  const route = req.url!.split('/').slice(0, 3).join('/') === '/api/users'

  switch (req.method) {
    case 'GET':
      switch (true) {
        case uuid && uuidValidate(uuid) && route:
          await _.getUser(req, res)

          break
        case uuid && !uuidValidate(uuid) && route:
          res.writeHead(400, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'User id invalid' }))

          break
        case route:
          await _.getUsers(req, res)

          break
        default:
          res.writeHead(404, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'Route not found' }))

          break
      }

      break
    case 'POST':
      switch (req.url) {
        case '/api/users':
          await _.createUser(req, res)

          break
        default:
          res.writeHead(404, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'Route not found' }))

          break
      }

      break
    case 'PUT':
      switch (true) {
        case uuid && uuidValidate(uuid) && route:
          await _.updateUser(req, res)

          break
        case uuid && !uuidValidate(uuid) && route:
          res.writeHead(400, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'User id invalid' }))

          break
        default:
          res.writeHead(404, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'Route not found' }))

          break
      }

      break
    case 'DELETE':
      switch (true) {
        case uuid && uuidValidate(uuid) && route:
          await _.deleteUser(req, res)

          break
        case uuid && !uuidValidate(uuid) && route:
          res.writeHead(400, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'User id invalid' }))

          break
        default:
          res.writeHead(404, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'Route not found' }))

          break
      }

      break
    default:
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Route not found' }))

      break
  }
}).listen(PORT, () => console.log(`Server started on port: ${PORT}`))
