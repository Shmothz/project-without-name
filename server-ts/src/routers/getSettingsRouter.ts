import {IDatabase} from '../types/database'
import express, {Response} from 'express'
import {SettingsModel} from '../models/settings/SettingsModel'
import {HTTP_STATUS_CODE} from '../constants/HTTP_STATUS_CODE'
import {RequestWithReqBody} from '../types/requests'
import {ChangeSettingsModel} from '../models/settings/ChangeSettingsModel'

export const getSettingsRouter = (db: IDatabase) => {
    const router = express.Router()

    router.get('', (req, res: Response<SettingsModel>) => {

        const settings = db.settings

        res.status(HTTP_STATUS_CODE.OK_200).json(settings)
    })
    router.put('', (req:RequestWithReqBody<ChangeSettingsModel>, res: Response) => {
        // if (!req.body.firstField || !req.body.secondField || !req.body.thirdField ) {
        //     res.sendStatus(HTTP_STATUS_CODE.BAD_REQUEST_400)
        //     return
        // }

        db.settings = req.body

        res.sendStatus(HTTP_STATUS_CODE.NO_CONTENT_204)

    })

    return router
}

