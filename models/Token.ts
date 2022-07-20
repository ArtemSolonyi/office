import mongoose from 'mongoose'

import {IToken} from "../interfaces/IToken";
export type ITokenType= IToken & mongoose.Document
const TokenSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    accessToken: {type: String, required: true},
    refreshToken: {type: String, required: true}
})

TokenSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});
export const TokenModel = mongoose.model<ITokenType>("Token", TokenSchema);
