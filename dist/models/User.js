import mongoose from "mongoose";
import autopopulate from 'mongoose-autopopulate';
export var UserRoles;
(function (UserRoles) {
    UserRoles["ADMIN"] = "ADMIN";
    UserRoles["BOSS"] = "BOSS";
    UserRoles["REGULAR"] = "REGULAR";
})(UserRoles || (UserRoles = {}));
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    role: { type: String, enum: UserRoles },
    password: { type: String, required: true },
    subordinates: [{ type: mongoose.Types.ObjectId, ref: 'User', autopopulate: { select: '-password' } }]
});
UserSchema.plugin(autopopulate);
export const UserModel = mongoose.model('User', UserSchema);
//# sourceMappingURL=User.js.map