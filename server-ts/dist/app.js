"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_json_1 = __importDefault(require("./db.json"));
const routers_1 = require("./routers");
const getSettingsRouter_1 = require("./routers/getSettingsRouter");
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
const jsonMiddleware = express_1.default.json();
exports.app.use(jsonMiddleware);
exports.app.use('/users', (0, routers_1.getUsersRouter)(db_json_1.default));
exports.app.use('/test', (0, routers_1.getTestsRouter)(db_json_1.default));
exports.app.use('/settings', (0, getSettingsRouter_1.getSettingsRouter)(db_json_1.default));
