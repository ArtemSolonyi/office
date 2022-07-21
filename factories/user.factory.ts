import {UserDto} from "../dto/user.dto";
import {TUser, UserModel, UserRoles} from "../models/User";
import {User} from "../services/user.service";

import {Result} from "../utils/result";

export async function createUser(body: UserDto, role: UserRoles): Promise<Result<TUser, string>> {
    const candidateUsername = await UserModel.findOne({username: body.username})
    if (candidateUsername) {
        return {ok: false, error: "Username is already exist"}
    }
    const createdObjectUser = new User(body, role)
    const bodyUser = await createdObjectUser.getInfoFromCreatedUser()
    const userModel: TUser = await UserModel.create(bodyUser)
    return {
        ok: true, value: userModel
    }

}