import {RefreshSecureDto, UserDto} from "../dto/user.dto";
import {injectable} from "inversify";
import {TUser, UserModel, UserRoles} from "../models/User";
import {TokenService} from "./token.service";
import bcrypt from "bcryptjs";
import {ITokenType, TokenModel} from "../models/Token";
import {createUser} from "../factories/user.factory";

@injectable()
export class AuthService {
    public async createConfirmedUser(body: UserDto, role: UserRoles) {
        const userResult = await createUser(body, role)
        if (userResult.ok) {
            await UserModel.findOneAndUpdate({role: UserRoles.ADMIN}, {$push: {subordinates: userResult.value._id}})
            const token = new TokenService(userResult.value._id)
            await token.tokensForRegister()
            return this._getInfoAboutUser(userResult.value, token)
        } else {
            return userResult.error
        }
    }

    public async loginUser({username, password}: UserDto) {
        const user: TUser | null = await UserModel.findOne({username: username})
        if (!user) {
            return {message: "User not exist"}
        }
        const coincide = await bcrypt.compare(password, user.password)
        if (!coincide) {
            return {message: "Password entered incorrectly"}
        }
        const token = new TokenService(user._id)
        await token.updateTokens()
        return this._getInfoAboutUser(user, token)
    }

    public async refreshSecure({refreshToken}: RefreshSecureDto) {
        const tokenModelInAvailable: ITokenType | null = await TokenModel.findOne({refreshToken: refreshToken})
        if (tokenModelInAvailable) {
            const token = new TokenService(tokenModelInAvailable.userId)
            await token.updateTokens()
            const user: | null = await UserModel.findOne({_id: tokenModelInAvailable.userId})
            return this._getInfoAboutUser(user, token)
        } else {
            return {message: "Refresh token expired"}
        }
    }

    public async logout(userId: string) {
        const tokenFind: ITokenType | null = await TokenModel.findOneAndUpdate({userId: userId}, {
            refreshToken: null,
            accessToken: null
        })
        if (tokenFind?.refreshToken === null || tokenFind?.accessToken === null) {
            return {message: "You already logout"}
        } else {
            return {message: "Successfully logout"}
        }
    }

    private _getInfoAboutUser(user: TUser | null, token: TokenService) {
        return {
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            user: {
                username: user?.username,
            }
        }
    }
}
