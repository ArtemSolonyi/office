import mongoose from "mongoose";

export interface IToken {
    accessToken: string,
    refreshToken: string,
    userId: mongoose.Types.ObjectId,
    _id: mongoose.Types.ObjectId,
}