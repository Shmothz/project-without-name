"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const HTTP_STATUS_CODE_1 = require("../constants/HTTP_STATUS_CODE");
const getRequest = () => (0, supertest_1.default)(app_1.app);
describe('/settings', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield getRequest().delete('/test/settings');
    }));
    it('should return 200 settings', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedSettings = {
            firstField: true,
            secondField: '',
            thirdField: true
        };
        yield getRequest()
            .get('/settings')
            .expect(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.OK_200, expectedSettings);
    }));
    it('update settings with correct input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const newSettingsData = {
            firstField: false,
            secondField: 'new settings',
            thirdField: false
        };
        yield getRequest()
            .put('/settings')
            .send(newSettingsData)
            .expect(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.NO_CONTENT_204);
        const changedResponse = yield getRequest()
            .get('/settings')
            .expect(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.OK_200);
        const changedBody = changedResponse.body;
        expect(changedBody).toEqual(newSettingsData);
    }));
});
