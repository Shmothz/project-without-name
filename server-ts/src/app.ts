import express from 'express'
import db from './db.json'
import {getTestsRouter, getUsersRouter} from './routers'
import {getSettingsRouter} from './routers/getSettingsRouter'

export const app = express()

const jsonMiddleware = express.json()
app.use(jsonMiddleware)

app.use('/users', getUsersRouter(db))

app.use('/test', getTestsRouter(db))

app.use('/settings', getSettingsRouter(db))

