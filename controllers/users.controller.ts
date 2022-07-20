import {injectable, inject} from 'inversify'
import {TYPES} from "../types/types";
import {UserService} from "../services/users.service";
import express, {Router,Request,Response} from "express";

@injectable()
export class UsersController {
    constructor(@inject(TYPES.UserService) private userService: UserService) {}

    private getUsers = async (req: Request, res: Response): Promise<Response> => {
        const result = await this.userService.getUsers(req.body)
        return res.status(200).json(result)
    }

    public Router(){
        const router:Router = express.Router()
        router.get('/users',this.getUsers)
        return router
    }
}