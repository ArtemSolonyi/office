import mongoose, {Document} from "mongoose"
import {IUser} from "../interfaces/IUser";

export enum UserRoles {
    ADMIN = 'ADMIN',
    BOSS = 'BOSS',
    REGULAR = 'REGULAR'

}

export type TUser = IUser & Document
const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    role: {type: String, enum: UserRoles},
    password:{type:String,required: true},
    subordinates: [{type: mongoose.Types.ObjectId, required: false}]
})
export const UserModel = mongoose.model<TUser>('User', UserSchema)
