import {RequestWithParams, RequestWithParamsAndReqBody, RequestWithQuery, RequestWithReqBody} from '../types/requests'
import {CreateAndUpdateUserBody, GetUserWithParams, QueryFilterUsers, UserModel} from '../models'
import express, {Response} from 'express'
import {HTTP_STATUS_CODE} from '../constants/HTTP_STATUS_CODE'
import {usersRep} from './repositories/usersRep'

export const getUsersRouter = () => {
    const router = express.Router()
    router.get('', (req: RequestWithQuery<QueryFilterUsers>, res: Response<UserModel[]>) => {
        const foundUsers = usersRep.findUsers(req.query.name)
        res.status(HTTP_STATUS_CODE.OK_200).json(foundUsers)
    })
    router.get('/:id', (req: RequestWithParams<GetUserWithParams>, res: Response<UserModel>) => {
        const user = usersRep.userById(req.params.id)
        if (!user) {
            res.sendStatus(HTTP_STATUS_CODE.NOT_FOUND_404)
            return
        }
        res.status(HTTP_STATUS_CODE.OK_200).json(user)
    })
    router.post('', (req: RequestWithReqBody<CreateAndUpdateUserBody>, res: Response<UserModel>) => {
        if (!req.body.name) {
            res.sendStatus(HTTP_STATUS_CODE.BAD_REQUEST_400)
            return
        }
        const newUser = usersRep.createNewUser(req.body.name)
        res.status(HTTP_STATUS_CODE.CREATED_201).json(newUser)
    })
    router.delete('/:id', (req: RequestWithParams<GetUserWithParams>, res: Response) => {
        const deletedUser = usersRep.deleteUser(req.params.id)
        if (!deletedUser) {
            res.sendStatus(HTTP_STATUS_CODE.NOT_FOUND_404)
        }
        res.sendStatus(HTTP_STATUS_CODE.NO_CONTENT_204)
    })
    router.put('/:id', (req:RequestWithParamsAndReqBody<GetUserWithParams, CreateAndUpdateUserBody>, res: Response) => {
        if (!req.body.name) {
            res.sendStatus(HTTP_STATUS_CODE.BAD_REQUEST_400)
            return
        }
        const user = usersRep.updateUser(req.params.id, req.body.name)
        if (!user) {
            res.sendStatus(HTTP_STATUS_CODE.NOT_FOUND_404)
            return
        }
        res.sendStatus(HTTP_STATUS_CODE.NO_CONTENT_204)
    })
    return router
}

