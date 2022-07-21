import express, {Express} from 'express'
import pkg from 'body-parser'
import cors from 'cors'
import dotenv from "dotenv"

dotenv.config();

import mongoose, {ConnectOptions} from "mongoose";
import "reflect-metadata"
import {injectable, inject} from "inversify";
import {TYPES} from "./types/types";
import {UsersController} from "./controllers/users.controller";
import {AuthController} from "./controllers/auth.controllers";

@injectable()
export class App {
    private app: Express
    private readonly port: string | number
    private readonly cors;

    constructor(@inject(TYPES.UsersController) private usersController: UsersController,
                @inject(TYPES.AuthController) private authController: AuthController) {
        this.app = express()
        this.port = process.env.PORT! || 3003
        this.cors = cors
        this.app.use(pkg())
        this.app.use(express.json())
        this.app.use(pkg.urlencoded({extended: true}))
    }

    public async initApp(): Promise<void> {
        await this.connectToDb()
        this.useCors()
        await this.listenApp()
        this.useRoutes()
    }

    private useRoutes() {
        this.app.use('/api/v1/', this.usersController.Router())
        this.app.use('/api/v1/auth', this.authController.Router())
    }

    private async connectToDb() {
        await mongoose.connect(process.env.DB_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions)
    }

    private useCors() {
        this.app.use(this.cors({origin: '*'}))
    }

    private async listenApp() {
        this.app.listen(this.port, () => console.log(`Server is working on ${this.port} PORT`))
    }
}