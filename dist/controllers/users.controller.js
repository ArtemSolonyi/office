var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { injectable, inject } from 'inversify';
import { TYPES } from "../types/types";
import { UserService } from "../services/users.service";
import express from "express";
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
        this.getUsers = async (req, res) => {
            const result = await this.userService.getUsers(req.body);
            return res.status(200).json(result);
        };
    }
    Router() {
        const router = express.Router();
        router.get('/users', this.getUsers);
        return router;
    }
};
UsersController = __decorate([
    injectable(),
    __param(0, inject(TYPES.UserService)),
    __metadata("design:paramtypes", [UserService])
], UsersController);
export { UsersController };
//# sourceMappingURL=users.controller.js.map