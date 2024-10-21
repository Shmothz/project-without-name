import express from 'express'
import db from './db.json'
import {getTestsRouter, getUsersRouter} from './routers'
import {getSettingsRouter} from './routers/getSettingsRouter'
import cors from 'cors'

export const app = express()

app.use(cors())

const jsonMiddleware = express.json()
app.use(jsonMiddleware)

app.use('/users', getUsersRouter())

app.use('/test', getTestsRouter())

app.use('/settings', getSettingsRouter())

