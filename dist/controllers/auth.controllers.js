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
import { inject, injectable } from "inversify";
import express from 'express';
import { RefreshSecureDto, UserDto } from "../dto/user.dto";
import { TYPES } from "../types/types";
import { AuthService } from "../services/auth.service";
import "reflect-metadata";
import { AuthMiddlewares } from "../middlewares/checkAuth";
import { validator } from "../validations/validator";
import { UserRoles } from "../models/User";
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.registration = async (req, res) => {
            console.log(req.body.username);
            const result = await this.authService.createConfirmedUser(req.body, UserRoles.REGULAR);
            return res.status(200).json(result);
        };
        this.login = async (req, res) => {
            const result = await this.authService.loginUser(req.body);
            return res.status(200).json(result);
        };
        this.refresh = async (req, res) => {
            const result = await this.authService.refreshSecure(req.body);
            return res.status(200).json(result);
        };
        this.logout = async (req, res) => {
            const result = await this.authService.logout(req.body.userId);
            return res.status(200).json(result);
        };
    }
    Router() {
        const router = express.Router();
        router
            .post('/registration', validator(UserDto), this.registration)
            .post('/login', validator(UserDto), this.login)
            .post('/refresh', validator(RefreshSecureDto), this.refresh)
            .delete('/logout', AuthMiddlewares.checkAuth, this.logout);
        return router;
    }
};
AuthController = __decorate([
    injectable(),
    __param(0, inject(TYPES.AuthService)),
    __metadata("design:paramtypes", [AuthService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controllers.js.map