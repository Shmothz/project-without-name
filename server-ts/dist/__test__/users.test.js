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
describe('/users', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield getRequest().delete('/test/users');
    }));
    it('should return 200 all users', () => __awaiter(void 0, void 0, void 0, function* () {
        yield getRequest()
            .get('/users')
            .expect(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.OK_200, []);
    }));
    it('should return 404 for not existing users', () => __awaiter(void 0, void 0, void 0, function* () {
        yield getRequest().get('/users/123456').expect(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.NOT_FOUND_404);
    }));
    it('shouldnt create user with incorrect data', () => __awaiter(void 0, void 0, void 0, function* () {
        const defectUser = {
            name: ''
        };
        yield getRequest().post('/users').send(defectUser).expect(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.BAD_REQUEST_400);
        yield getRequest()
            .get('/users')
            .expect(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.OK_200, []);
    }));
    let createdUser1;
    it('should create user with correct data', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            name: 'First Name'
        };
        const createdResponse = yield getRequest()
            .post('/users')
            .send(newUser)
            .expect(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.CREATED_201);
        createdUser1 = createdResponse.body;
        expect(createdUser1).toEqual({
            id: expect.any(Number),
            name: newUser.name
        });
        yield getRequest()
            .get('/users')
            .expect(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.OK_200, [createdUser1]);
    }));
    let createdUser2;
    it('create one more user', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            name: 'Second User'
        };
        const createdResponse = yield getRequest()
            .post('/users')
            .send(newUser)
            .expect(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.CREATED_201);
        createdUser2 = createdResponse.body;
        expect(createdUser2).toEqual({
            id: expect.any(Number),
            name: newUser.name
        });
        yield getRequest()
            .get('/users')
            .expect(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.OK_200, [createdUser1, createdUser2]);
    }));
    it('shouldnt update user with incorrect data', () => __awaiter(void 0, void 0, void 0, function* () {
        const newBadUserData = {
            name: ''
        };
        yield getRequest()
            .put(`/users/${createdUser1.id}`)
            .send(newBadUserData)
            .expect(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.BAD_REQUEST_400);
        yield getRequest()
            .get(`/users/${createdUser1.id}`)
            .expect(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.OK_200, createdUser1);
    }));
    let updatedUser1;
    it('should update user with correct data', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUserData = {
            name: 'New User Name'
        };
        const expectedUserData = {
            id: createdUser1.id,
            name: newUserData.name
        };
        yield getRequest()
            .put(`/users/${createdUser1.id}`)
            .send(newUserData)
            .expect(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.NO_CONTENT_204);
        const updatedResponse = yield getRequest()
            .get(`/users/${createdUser1.id}`)
            .expect(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.OK_200);
        updatedUser1 = updatedResponse.body;
        expect(updatedUser1).toEqual(expectedUserData);
        yield getRequest()
            .get(`/users/${createdUser2.id}`)
            .expect(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.OK_200, createdUser2);
    }));
    it('delete all courses', () => __awaiter(void 0, void 0, void 0, function* () {
        yield getRequest()
            .delete(`/users/${createdUser1.id}`)
            .expect(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.NO_CONTENT_204);
        yield getRequest()
            .get(`/users/${createdUser1.id}`)
            .expect(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.NOT_FOUND_404);
        yield getRequest()
            .delete(`/users/${createdUser2.id}`)
            .expect(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.NO_CONTENT_204);
        yield getRequest()
            .get('/users')
            .expect(HTTP_STATUS_CODE_1.HTTP_STATUS_CODE.OK_200, []);
    }));
});
