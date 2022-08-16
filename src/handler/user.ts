import { IncomingMessage } from 'http'
import { v4 as uuidv4 } from 'uuid'
import { userVerification } from './../util/user'
import { User } from './../interface/user'

let users: User[] = []

export const findAll = () => new Promise((res, rej) => {
    try {
      res(users)
    } catch (err) {
      rej(err)
    }
  })

export const findById = (userId: string) => new Promise((res, rej) => {
    try {
      res(users.find(({ id }) => id === userId))
    } catch (err) {
      rej(err)
    }
  })

export const create = (req: IncomingMessage) => new Promise((res, rej) => {
    try {
      let newUser: User
      let body = ''

      req.on('data', (chunk: Buffer) => (body += chunk))

      req.on('end', () => {
        newUser = { id: uuidv4(), ...JSON.parse(body) }

        const isValidUser = userVerification(newUser)

        if (isValidUser) {
          users.push(isValidUser)
          res(isValidUser)
        } else {
          res(false)
        }
      })
    } catch (err) {
      rej(err)
    }
  })

export const update = (req: IncomingMessage, userId: string) => new Promise((res, rej) => {
    try {
      let updateUser: User
      let body = ''

      req.on('data', (chunk: Buffer) => (body += chunk))

      req.on('end', () => {
        updateUser = { id: userId, ...JSON.parse(body) }

        const isValidUser = userVerification(updateUser)

        if (isValidUser) {
          const index = users.findIndex(({ id }) => id === userId)
          users[index] = isValidUser
          res(isValidUser)
        } else {
          res(false)
        }
      })
    } catch (err) {
      rej(err)
    }
  })

export const remove = (userId: string) => new Promise((res, rej) => {
    try {
      if (users.findIndex(({ id }) => id === userId) !== -1) {
        users = users.filter(({ id }) => id !== userId)
        res(true)
      } else {
        res(false)
      }
    } catch (err) {
      rej(err)
    }
  })
