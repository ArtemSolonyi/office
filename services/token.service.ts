import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import {TokenModel} from "../models/Token";

export class TokenService {
    private readonly userId: mongoose.Types.ObjectId | undefined
    private _accessToken: string
    private _refreshToken: string

    constructor(userId: mongoose.Types.ObjectId | undefined) {
        this.userId = userId
    }

    private async groupingCreatedTokens(): Promise<void> {
        const payloadData = {
            userId: this.userId
        }
        this._accessToken = await this._createToken(payloadData, process.env.SECRET_KEY_ACCESS_JWT!, "15m")
        this._refreshToken = await this._createToken(payloadData, process.env.SECRET_KEY_REFRESH_JWT!, '30d')
    }

    private async _createToken(payloadData: object, secretKey: string, timeExpire: string): Promise<string> {
        return jwt.sign(payloadData, secretKey, {expiresIn: timeExpire});
    }

    private async saveCreatedTokens() {
        await TokenModel.create({
            userId: this.userId,
            accessToken: this._accessToken,
            refreshToken: this._refreshToken
        })
    }

    public get accessToken() {
        return this._accessToken
    }

    public get refreshToken() {
        return this._refreshToken
    }

    public async updateTokens() {
        await this.groupingCreatedTokens()
        await TokenModel.findOneAndUpdate({userId: this.userId}, {
            accessToken: this._accessToken,
            refreshToken: this._refreshToken
        },)

    }

    public async tokensForRegister() {
        await this.groupingCreatedTokens()
        await this.saveCreatedTokens()
    }
}