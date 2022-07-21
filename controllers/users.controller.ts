import {injectable, inject} from 'inversify'
import {TYPES} from "../types/types";
import {UserService} from "../services/users.service";
import express, {Router, Request, Response} from "express";
import {AuthMiddlewares,} from "../middlewares/checkAuth";
import {SubordinateDto, UserIdDto} from "../dto/subordinate.dto";
import {validator} from "../validator/validator";

@injectable()
export class UsersController {
    constructor(@inject(TYPES.UserService) private userService: UserService) {
    }

    private getUsers = async (req: Request<{}, {}, { userId: string }, {}>, res: Response): Promise<Response> => {
        const result = await this.userService.getUsers(req.body.userId)
        return res.status(200).json(result)
    }
    private addSubordinateToUser = async (req: Request<{}, {}, SubordinateDto, {}>, res: Response): Promise<Response> => {
        const result = await this.userService.addSubordinateToUser(req.body)
        return res.status(200).json(result)
    }

    public Router() {
        const router: Router = express.Router()
        router.get('/users', AuthMiddlewares.checkAuth, validator(UserIdDto), this.getUsers)
            .post('/change', AuthMiddlewares.checkAuth, validator(SubordinateDto), this.addSubordinateToUser)
        return router
    }
}