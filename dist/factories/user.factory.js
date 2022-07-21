import { UserModel } from "../models/User";
import { User } from "../services/user.service";
export async function createUser(body, role) {
    const candidateUsername = await UserModel.findOne({ username: body.username });
    if (candidateUsername) {
        return { ok: false, error: "Username is already exist" };
    }
    const createdObjectUser = new User(body, role);
    const bodyUser = await createdObjectUser.getInfoFromCreatedUser();
    const userModel = await UserModel.create(bodyUser);
    return {
        ok: true, value: userModel
    };
}
//# sourceMappingURL=user.factory.js.map