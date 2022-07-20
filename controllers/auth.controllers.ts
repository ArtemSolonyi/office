import {inject, injectable} from "inversify";
import express, {Request, Response, Router} from 'express'
import {RefreshSecureDto, UserDto} from "../dto/user.dto";
import {TYPES} from "../types/types";
import {AuthService} from "../services/auth.service";
import "reflect-metadata"
import {AuthMiddlewares} from "../middlewares/checkAuth";
import {validator} from "../validations/validator";
import {UserRoles} from "../models/User";

@injectable()
export class AuthController {
    constructor(@inject(TYPES.AuthService) private authService: AuthService) {
    }

    private registration = async (req: Request<{}, {}, UserDto>, res: Response): Promise<Response> => {
        console.log(req.body.username)
        const result = await this.authService.createConfirmedUser(req.body,UserRoles.REGULAR)
        return res.status(200).json(result)
    }
    private login = async (req: Request<{}, {}, UserDto>, res: Response): Promise<Response> => {
        const result = await this.authService.loginUser(req.body)
        return res.status(200).json(result)
    }
    private refresh = async (req: Request<{}, {}, RefreshSecureDto>, res: Response): Promise<Response> => {
        const result = await this.authService.refreshSecure(req.body)
        return res.status(200).json(result)
    }
    private logout = async (req: Request<{}, {}, {userId:string}>, res: Response): Promise<Response> => {
        const result = await this.authService.logout(req.body.userId)
        return res.status(200).json(result)
    }

    public Router() {
        const router: Router = express.Router()
        router
            .post('/registration', validator(UserDto), this.registration)
            .post('/login', validator(UserDto), this.login)
            .post('/refresh', validator(RefreshSecureDto), this.refresh)
            .delete('/logout', AuthMiddlewares.checkAuth, this.logout)
        return router
    }
}