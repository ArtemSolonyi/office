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
import express from 'express';
import pkg from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import "reflect-metadata";
import { injectable, inject } from "inversify";
import { TYPES } from "./types/types";
import { UsersController } from "./controllers/users.controller";
import { AuthController } from "./controllers/auth.controllers";
let App = class App {
    constructor(usersController, authController) {
        this.usersController = usersController;
        this.authController = authController;
        this.app = express();
        this.port = process.env.PORT || 3003;
        this.cors = cors;
        this.app.use(pkg());
        this.app.use(express.json());
        this.app.use(pkg.urlencoded({ extended: true }));
    }
    async initApp() {
        await this.connectToDb();
        this.useCors();
        await this.listenApp();
        this.useRoutes();
    }
    useRoutes() {
        this.app.use('/api/v1/', this.usersController.Router());
        this.app.use('/api/v1/auth', this.authController.Router());
    }
    async connectToDb() {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    useCors() {
        this.app.use(this.cors({ origin: '*' }));
    }
    async listenApp() {
        this.app.listen(this.port, () => console.log(`Server is working on ${this.port} PORT`));
    }
};
App = __decorate([
    injectable(),
    __param(0, inject(TYPES.UsersController)),
    __param(1, inject(TYPES.AuthController)),
    __metadata("design:paramtypes", [UsersController,
        AuthController])
], App);
export { App };
//# sourceMappingURL=app.js.map