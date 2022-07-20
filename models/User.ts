import mongoose, {Document} from "mongoose"

enum UserRoles {
    ADMIN = 'ADMIN',
    BOSS = 'BOSS',
    REGULAR = 'REGULAR'

}

interface IUser {
    username: string,
    role: UserRoles
}

type TUser = IUser & Document
const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    role: {type: String, enum: UserRoles},
    subordinates: [{type: mongoose.Types.ObjectId, required: false}]
})
export const UserModel = mongoose.model<TUser>('User', UserSchema)
