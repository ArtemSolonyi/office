import {injectable, inject} from 'inversify'
import {TYPES} from "../types/types";
import {UserService} from "../services/users.service";
import express, {Router} from "express";

@injectable()
export class UsersController {
    constructor(@inject(TYPES.UserService) private userService: UserService) {}

    private getUsers(){
        return
    }
    public Router(){
        const router:Router =  express.Router()
        router.get('/users',this.getUsers)
        return router
    }
}