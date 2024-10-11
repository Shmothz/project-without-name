"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettingsRouter = void 0;
const express_1 = __importDefault(require("express"));
const HTTP_STATUS_CODE_1 = require("../constants/HTTP_STATUS_CODE");
const getSettingsRouter = (db) => {
    const router = express_1.default.Router();
    router.get('', (req, res) => {
        const settings = db.settings;
        res.status(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.OK_200).json(settings);
    });
    router.put('', (req, res) => {
        // if (!req.body.firstField || !req.body.secondField || !req.body.thirdField ) {
        //     res.sendStatus(HTTP_STATUS_CODE.BAD_REQUEST_400)
        //     return
        // }
        db.settings = req.body;
        res.sendStatus(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.NO_CONTENT_204);
    });
    return router;
};
exports.getSettingsRouter = getSettingsRouter;
