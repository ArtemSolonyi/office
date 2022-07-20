import {injectable} from "inversify";
import {UserModel, UserRoles} from "../models/User";

@injectable()
export class UserService {
    constructor() {}
    public async getUsers({role,userId}:any) {
        switch (role){
            case UserRoles.ADMIN:{
                return (await UserModel.find())
            }
            case UserRoles.BOSS:{
                return (await UserModel.find({_id:userId}).populate({path:'subordinates',select:'_id'}))
            }
            case UserRoles.REGULAR:{
                return (await UserModel.find({_id:userId}))
            }
            default:{
                return null
            }
        }
    }
}