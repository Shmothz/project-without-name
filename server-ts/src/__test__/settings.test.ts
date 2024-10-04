import request from 'supertest'
import {app} from '../app'
import {HTTP_STATUS_CODE} from '../constants/HTTP_STATUS_CODE'
import {SettingsModel} from '../models/settings/SettingsModel'
import {ChangeSettingsModel} from '../models/settings/ChangeSettingsModel'

const getRequest = () => request(app)
describe('/settings', () => {
    beforeAll(async () => {
        await getRequest().delete('/test/settings')
    })
    it('should return 200 settings', async () => {
        const expectedSettings: SettingsModel = {
            firstField: true,
            secondField: '',
            thirdField: true
        }
        await getRequest()
            .get('/settings')
            .expect(HTTP_STATUS_CODE.OK_200, expectedSettings)
    })
    it('update settings with correct input data', async () => {
        const newSettingsData: ChangeSettingsModel = {
            firstField: false,
            secondField: 'new settings',
            thirdField: false
        }
        await getRequest()
            .put('/settings')
            .send(newSettingsData)
            .expect(HTTP_STATUS_CODE.NO_CONTENT_204)
        const changedResponse = await getRequest()
            .get('/settings')
            .expect(HTTP_STATUS_CODE.OK_200)
        const changedBody = changedResponse.body
        expect(changedBody).toEqual(newSettingsData)
    })
})