"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersRouter = void 0;
const express_1 = __importDefault(require("express"));
const HTTP_STATUS_CODE_1 = require("../constants/HTTP_STATUS_CODE");
const getUsersRouter = (db) => {
    const router = express_1.default.Router();
    router.get('', (req, res) => {
        let foundUsers = db.users;
        if (req.query.name) {
            foundUsers = foundUsers.filter((user) => user.name.indexOf(req.query.name) > -1);
        }
        res.status(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.OK_200).json(foundUsers);
    });
    router.get('/:id', (req, res) => {
        const user = db.users.find((user) => user.id === Number(req.params.id));
        if (!user) {
            res.sendStatus(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.NOT_FOUND_404);
            return;
        }
        res.status(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.OK_200).json(user);
    });
    router.post('', (req, res) => {
        if (!req.body.name) {
            res.sendStatus(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.BAD_REQUEST_400);
            return;
        }
        const newUser = {
            id: +(new Date()),
            name: req.body.name
        };
        db.users.push(newUser);
        res.status(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.CREATED_201).json(newUser);
    });
    router.delete('/:id', (req, res) => {
        db.users = db.users.filter((user) => user.id !== +req.params.id);
        res.sendStatus(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.NO_CONTENT_204);
    });
    router.put('/:id', (req, res) => {
        if (!req.body.name) {
            res.sendStatus(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.BAD_REQUEST_400);
            return;
        }
        const user = db.users.find((user) => user.id === +req.params.id);
        if (!user) {
            res.sendStatus(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.NOT_FOUND_404);
            return;
        }
        user.name = req.body.name;
        res.sendStatus(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.NO_CONTENT_204);
    });
    return router;
};
exports.getUsersRouter = getUsersRouter;
