import {RequestWithParams, RequestWithParamsAndReqBody, RequestWithQuery, RequestWithReqBody} from '../types/requests'
import {CreateAndUpdateUserBody, GetUserWithParams, QueryFilterUsers, UserModel} from '../models'
import express, {Response} from 'express'
import {HTTP_STATUS_CODE} from '../constants/HTTP_STATUS_CODE'
import {IDatabase} from '../types/database'

export const getUsersRouter = (db: IDatabase) => {
    const router = express.Router()

    router.get('', (req: RequestWithQuery<QueryFilterUsers>, res: Response<UserModel[]>) => {

        let foundUsers = db.users

        if (req.query.name) {
            foundUsers = foundUsers.filter((user) => user.name.indexOf(req.query.name as string) > -1)
        }

        res.status(HTTP_STATUS_CODE.OK_200).json(foundUsers)
    })
    router.get('/:id', (req: RequestWithParams<GetUserWithParams>, res: Response<UserModel>) => {
        const user = db.users.find((user) => user.id === Number(req.params.id))
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
        const newUser = {
            id: +(new Date()),
            name: req.body.name
        }
        db.users.push(newUser)
        res.status(HTTP_STATUS_CODE.CREATED_201).json(newUser)
    })
    router.delete('/:id', (req: RequestWithParams<GetUserWithParams>, res: Response) => {

        db.users = db.users.filter((user) => user.id !== +req.params.id)

        res.sendStatus(HTTP_STATUS_CODE.NO_CONTENT_204)
    })
    router.put('/:id', (req:RequestWithParamsAndReqBody<GetUserWithParams, CreateAndUpdateUserBody>, res: Response) => {
        if (!req.body.name) {
            res.sendStatus(HTTP_STATUS_CODE.BAD_REQUEST_400)
            return
        }

        const user = db.users.find((user) => user.id === +req.params.id)

        if (!user) {
            res.sendStatus(HTTP_STATUS_CODE.NOT_FOUND_404)
            return
        }

        user.name = req.body.name

        res.sendStatus(HTTP_STATUS_CODE.NO_CONTENT_204)

    })

    return router
}

