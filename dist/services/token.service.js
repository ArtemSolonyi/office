import jwt from 'jsonwebtoken';
import { TokenModel } from "../models/Token";
export class TokenService {
    constructor(userId) {
        this.userId = userId;
    }
    async groupingCreatedTokens() {
        const payloadData = {
            userId: this.userId
        };
        this._accessToken = await this._createToken(payloadData, process.env.SECRET_KEY_ACCESS_JWT, "15m");
        this._refreshToken = await this._createToken(payloadData, process.env.SECRET_KEY_REFRESH_JWT, '30d');
    }
    async _createToken(payloadData, secretKey, timeExpire) {
        return jwt.sign(payloadData, secretKey, { expiresIn: timeExpire });
    }
    async saveCreatedTokens() {
        await TokenModel.create({
            userId: this.userId,
            accessToken: this._accessToken,
            refreshToken: this._refreshToken
        });
    }
    get accessToken() {
        return this._accessToken;
    }
    get refreshToken() {
        return this._refreshToken;
    }
    async updateTokens() {
        await this.groupingCreatedTokens();
        await TokenModel.findOneAndUpdate({ userId: this.userId }, {
            accessToken: this._accessToken,
            refreshToken: this._refreshToken
        });
    }
    async tokensForRegister() {
        await this.groupingCreatedTokens();
        await this.saveCreatedTokens();
    }
}
//# sourceMappingURL=token.service.js.map