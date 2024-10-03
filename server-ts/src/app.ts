import express from 'express'
import db from './db.json'
import {getTestsRouter, getUsersRouter} from './routers'

export const app = express()

const jsonMiddleware = express.json()
app.use(jsonMiddleware)

const usersRouter = getUsersRouter(db)
app.use('/users',usersRouter)

const testRouter = getTestsRouter(db)
app.use('/test',testRouter)

