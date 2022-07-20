var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from "inversify";
import { UserModel } from "../models/User";
import { TokenService } from "./token.service";
import bcrypt from "bcryptjs";
import { TokenModel } from "../models/Token";
import { findOrCreateUser } from "../factories/user.factory";
let AuthService = class AuthService {
    async createConfirmedUser(body, role) {
        const userResult = await findOrCreateUser(body, role);
        if (userResult.ok) {
            const token = new TokenService(userResult.value._id);
            await token.tokensForRegister();
            return this._getInfoAboutUser(userResult.value, token);
        }
        else {
            return userResult.error;
        }
    }
    async loginUser({ username, password }) {
        const user = await UserModel.findOne({ username: username });
        if (!user) {
            return { message: "User not exist" };
        }
        const coincide = await bcrypt.compare(password, user.password);
        if (!coincide) {
            return { message: "Password entered incorrectly" };
        }
        const token = new TokenService(user._id);
        await token.updateTokens();
        return this._getInfoAboutUser(user, token);
    }
    async refreshSecure({ refreshToken }) {
        const tokenModelInAvailable = await TokenModel.findOne({ refreshToken: refreshToken });
        if (tokenModelInAvailable) {
            const token = new TokenService(tokenModelInAvailable.userId);
            await token.updateTokens();
            const user = await UserModel.findOne({ _id: tokenModelInAvailable.userId });
            return this._getInfoAboutUser(user, token);
        }
        else {
            return { message: "Refresh token expired" };
        }
    }
    async logout(userId) {
        const tokenFind = await TokenModel.findOneAndUpdate({ userId: userId }, {
            refreshToken: null,
            accessToken: null
        });
        if ((tokenFind === null || tokenFind === void 0 ? void 0 : tokenFind.refreshToken) === null || (tokenFind === null || tokenFind === void 0 ? void 0 : tokenFind.accessToken) === null) {
            return { message: "You already logout" };
        }
        else {
            return { message: "Successfully logout" };
        }
    }
    _getInfoAboutUser(user, token) {
        return {
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            user: {
                username: user === null || user === void 0 ? void 0 : user.username,
            }
        };
    }
};
AuthService = __decorate([
    injectable()
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map