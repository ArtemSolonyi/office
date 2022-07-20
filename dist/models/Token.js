import mongoose from 'mongoose';
const TokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true }
});
TokenSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});
export const TokenModel = mongoose.model("Token", TokenSchema);
//# sourceMappingURL=Token.js.map