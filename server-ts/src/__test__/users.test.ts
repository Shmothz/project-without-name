import request from 'supertest'
import {CreateAndUpdateUserBody, UserModel} from '../models'
import {app} from '../app'
import {HTTP_STATUS_CODE} from '../constants/HTTP_STATUS_CODE'

const getRequest = () => request(app)

describe('/users', () => {
    beforeAll( async() => {
        await getRequest().delete('/test')
    })
    it('should return 200 all users',  async () => {
        await getRequest()
            .get('/users')
            .expect(HTTP_STATUS_CODE.OK_200, [])
    })
    it('should return 404 for not existing users', async () => {
        await getRequest().get('/users/123456').expect(HTTP_STATUS_CODE.NOT_FOUND_404)
    })
    it('shouldnt create user with incorrect data', async () => {
        const defectUser: CreateAndUpdateUserBody = {
            name: ''
        }
        await getRequest().post('/users').send(defectUser).expect(HTTP_STATUS_CODE.BAD_REQUEST_400)
        await getRequest()
            .get('/users')
            .expect(HTTP_STATUS_CODE.OK_200, [])
    })
    let createdUser1: UserModel
    it('should create user with correct data', async () => {
        const newUser: CreateAndUpdateUserBody = {
            name: 'First Name'
        }
        const createdResponse = await getRequest()
            .post('/users')
            .send(newUser)
            .expect(HTTP_STATUS_CODE.CREATED_201)
        createdUser1 = createdResponse.body
        expect(createdUser1).toEqual({
            id: expect.any(Number),
            name: newUser.name
        })
        await getRequest()
            .get('/users')
            .expect(HTTP_STATUS_CODE.OK_200, [createdUser1])
    })
    let createdUser2: UserModel
    it('create one more user', async () => {
        const newUser: CreateAndUpdateUserBody = {
            name: 'Second User'
        }
        const createdResponse = await getRequest()
            .post('/users')
            .send(newUser)
            .expect(HTTP_STATUS_CODE.CREATED_201)
        createdUser2 = createdResponse.body
        expect(createdUser2).toEqual({
            id: expect.any(Number),
            name: newUser.name
        })
        await getRequest()
            .get('/users')
            .expect(HTTP_STATUS_CODE.OK_200, [createdUser1, createdUser2])
    })
    it('shouldnt update user with incorrect data', async () => {
        const newBadUserData = {
            name: ''
        }
        await getRequest()
            .put(`/users/${createdUser1.id}`)
            .send(newBadUserData)
            .expect(HTTP_STATUS_CODE.BAD_REQUEST_400)
        await getRequest()
            .get(`/users/${createdUser1.id}`)
            .expect(HTTP_STATUS_CODE.OK_200, createdUser1)
    })
    let updatedUser1: UserModel
    it('should update user with correct data', async () => {
        const newUserData = {
            name: 'New User Name'
        }
        const expectedUserData = {
            id: createdUser1.id,
            name: newUserData.name
        }
        await getRequest()
            .put(`/users/${createdUser1.id}`)
            .send(newUserData)
            .expect(HTTP_STATUS_CODE.NO_CONTENT_204)
        const updatedResponse = await getRequest()
            .get(`/users/${createdUser1.id}`)
            .expect(HTTP_STATUS_CODE.OK_200)
        updatedUser1 = updatedResponse.body
        expect(updatedUser1).toEqual(expectedUserData)
        await getRequest()
            .get(`/users/${createdUser2.id}`)
            .expect(HTTP_STATUS_CODE.OK_200, createdUser2)
    })
    it('delete all courses', async () => {
        await getRequest()
            .delete(`/users/${createdUser1.id}`)
            .expect(HTTP_STATUS_CODE.NO_CONTENT_204)
        await getRequest()
            .get(`/users/${createdUser1.id}`)
            .expect(HTTP_STATUS_CODE.NOT_FOUND_404)
        await getRequest()
            .delete(`/users/${createdUser2.id}`)
            .expect(HTTP_STATUS_CODE.NO_CONTENT_204)
        await getRequest()
            .get('/users')
            .expect(HTTP_STATUS_CODE.OK_200, [])
    })
});