"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestsRouter = void 0;
const express_1 = __importDefault(require("express"));
const HTTP_STATUS_CODE_1 = require("../constants/HTTP_STATUS_CODE");
const getTestsRouter = (db) => {
    const router = express_1.default.Router();
    router.delete('/users', (_, res) => {
        db.users = [];
        res.sendStatus(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.NO_CONTENT_204);
    });
    router.delete('/settings', (_, res) => {
        db.settings = {
            firstField: true,
            secondField: '',
            thirdField: true
        };
        res.sendStatus(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.NO_CONTENT_204);
    });
    return router;
};
exports.getTestsRouter = getTestsRouter;
