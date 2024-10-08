import express, {Response} from 'express'
import {HTTP_STATUS_CODE} from '../constants/HTTP_STATUS_CODE'
import {IDatabase} from '../types/database'

export const getTestsRouter = (db: IDatabase) => {

    const router = express.Router()

    router.delete('/users', (_, res: Response) => {
        db.users = []
        res.sendStatus(HTTP_STATUS_CODE.NO_CONTENT_204)
    })

    router.delete('/settings',(_, res: Response) => {
        db.settings = {
            firstField: true,
            secondField: '',
            thirdField: true
        }
        res.sendStatus(HTTP_STATUS_CODE.NO_CONTENT_204)
    })

    return router
}



