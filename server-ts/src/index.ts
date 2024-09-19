import express from 'express'
import db from './db.json'

const app = express()

const jsonMiddleware = express.json()
app.use(jsonMiddleware)

const port = 3000

const HTTP_STATUS = {
    OK_200: 200,
    CREATED_201: 201,
    ACCEPTED_202: 202,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    UNAUTH_401: 401,
    PAYMENT_REQUIRED_402: 402,
    FORBIDDEN_403: 403,
    NOT_FOUND_404: 404,
}

app.get('/users', (req, res) => {

    let foundUsers = db.users

    if (req.query.name) {
        foundUsers = foundUsers.filter((user) => user.name.indexOf(req.query.name as string) > -1)
    }

    res.status(HTTP_STATUS.OK_200).json(foundUsers)
})
app.get('/users/:id', (req, res) => {
    const user = db.users.find((user) => user.id === Number(req.params.id))
    if (!user) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
        return
    }
    res.status(HTTP_STATUS.OK_200).json(user)

})
app.post('/users', (req, res) => {
    if (!req.body.name) {
        res.sendStatus(HTTP_STATUS.BAD_REQUEST_400)
        return
    }
    const newUser = {
        id: +(new Date()),
        name: req.body.name
    }
    db.users.push(newUser)
    res.status(HTTP_STATUS.CREATED_201).json(newUser)
})
app.delete('/users/:id', (req, res) => {

    db.users = db.users.filter((user) => user.id !== +req.params.id)

    res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})
app.put('/users/:id', (req, res) => {
    if (!req.body.name) {
        res.sendStatus(HTTP_STATUS.BAD_REQUEST_400)
        return
    }

    const user = db.users.find((user) => user.id === +req.params.id)

    if (user) {
        user.name = req.body.name
    }

    res.sendStatus(HTTP_STATUS.NO_CONTENT_204)

})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})