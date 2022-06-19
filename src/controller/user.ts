import { IncomingMessage, ServerResponse } from 'http'
import * as Users from './../handler/user'

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await Users.findAll()

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(users))
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Internal server error' }))
  }
}

export const getUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const userId = req.url!.split('/')[3]
    const user = await Users.findById(userId)

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'User not found' }))
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(user))
    }
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Internal server error' }))
  }
}

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const newUser = await Users.create(req)

    if (!newUser) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Body does not contain required fields' }))
    } else {
      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(newUser))
    }
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Internal server error' }))
  }
}

export const updateUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const userId = req.url!.split('/')[3]
    const user = await Users.findById(userId)
    const updateUser = await Users.update(req, userId)

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'User not found' }))
    } else if (!updateUser) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Body does not contain required fields' }))
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(updateUser))
    }
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Internal server error' }))
  }
}

export const deleteUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const userId = req.url!.split('/')[3]
    const user = await Users.findById(userId)
    const deleteUser = await Users.remove(userId)

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'User not found' }))
    } else if (!deleteUser) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Internal server error' }))
    } else {
      res.writeHead(204, { 'Content-Type': 'application/json' })
      res.end()
    }
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Internal server error' }))
  }
}
