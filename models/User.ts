import mongoose, {Document} from "mongoose"
import {IUser} from "../interfaces/IUser";
import autopopulate from 'mongoose-autopopulate';
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
    subordinates: [{type: mongoose.Types.ObjectId,ref:'User',autopopulate: { select: '-password' }}]
})
UserSchema.plugin(autopopulate)
export const UserModel = mongoose.model<TUser>('User', UserSchema)
