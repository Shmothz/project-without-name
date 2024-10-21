import express, {Response} from 'express'
import {SettingsModel} from '../models/settings/SettingsModel'
import {HTTP_STATUS_CODE} from '../constants/HTTP_STATUS_CODE'
import {RequestWithReqBody} from '../types/requests'
import {ChangeSettingsModel} from '../models/settings/ChangeSettingsModel'
import {settingsRep} from './repositories/settingsRep'

export const getSettingsRouter = () => {
    const router = express.Router()
    router.get('', (req, res: Response<SettingsModel>) => {
        const settings = settingsRep.getSettings()
        res.status(HTTP_STATUS_CODE.OK_200).json(settings)
    })
    router.put('', (req: RequestWithReqBody<ChangeSettingsModel>, res: Response) => {
        const newSettings = settingsRep.updateSettings(req.body)
        res.status(HTTP_STATUS_CODE.OK_200).json(newSettings)
    })
    return router
}

