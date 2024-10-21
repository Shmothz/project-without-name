import express, {Response} from 'express'
import {HTTP_STATUS_CODE} from '../constants/HTTP_STATUS_CODE'
import {testRep} from './repositories/testRep'

export const getTestsRouter = () => {

    const router = express.Router()

    router.delete('/users', (_, res: Response) => {
        testRep.clearUsers()
        res.sendStatus(HTTP_STATUS_CODE.NO_CONTENT_204)
    })

    router.delete('/settings', (_, res: Response) => {
        testRep.clearSettings()
        res.sendStatus(HTTP_STATUS_CODE.NO_CONTENT_204)
    })

    return router
}



