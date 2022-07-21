var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { injectable } from "inversify";
import { UserModel, UserRoles } from "../models/User";
import mongoose from "mongoose";
let UserService = class UserService {
    constructor() { }
    async getUsers({ userId }) {
        return (await UserModel.find({ _id: userId }).select('-password'));
    }
    async addSubordinateToUser({ bossId, subordinateId, userId }) {
        const hasPermission = await this.checkPermissionToSetRole(userId, bossId, subordinateId);
        if (!hasPermission) {
            return { message: "You don't have permission" };
        }
        const alreadyHasSubordinate = await UserModel.findOne({ $and: [{ _id: bossId }, { subordinates: { $all: [subordinateId], $exists: true } }] });
        if (alreadyHasSubordinate) {
            return { message: "Subordinate already exists" };
        }
        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
            (await this.removeSubordinateFromBoss(subordinateId))(await UserModel.findOneAndUpdate({ _id: bossId }, { role: UserRoles.BOSS, $push: { subordinates: subordinateId } }, { new: true }).select('-password'));
        });
        await session.endSession();
    }
    async removeSubordinateFromBoss(subordinateId) {
        return (await UserModel.findOneAndUpdate({ subordinates: { $all: [subordinateId], $exists: true } }, { $pull: { subordinates: subordinateId } }));
    }
    async checkPermissionToSetRole(currentUserId, bossId, subordinateId) {
        const user = await UserModel.find({ $and: [{ _id: currentUserId }, { subordinates: { $all: [bossId, subordinateId], $exists: true } }] });
        return !!user;
    }
};
UserService = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], UserService);
export { UserService };
//# sourceMappingURL=users.service.js.map