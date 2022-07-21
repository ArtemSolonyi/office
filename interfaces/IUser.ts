import mongoose from "mongoose";
import {UserRoles} from "../models/User";

export interface IUser {
    username: string
    role:  UserRoles
    subordinates: Array<string>
    password:string
}