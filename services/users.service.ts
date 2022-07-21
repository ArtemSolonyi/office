import {injectable} from "inversify";
import {UserModel, UserRoles} from "../models/User";
import mongoose from "mongoose"
import {SubordinateDto} from "../dto/subordinate.dto";

@injectable()
export class UserService {
    constructor() {
    }

    public async getUsers(userId:string) {
        return (await UserModel.find({_id: userId}).select('-password'))
    }

    public async addSubordinateToUser({bossId, subordinateId, userId}: SubordinateDto) {
        const hasPermission = await this.checkPermissionToSetRole(userId, bossId, subordinateId)
        if (!hasPermission) {
            return {message: "You don't have permission"}
        }
        const alreadyHasSubordinate = await UserModel.findOne({
            $and: [{_id: bossId}, {
                subordinates: {
                    $all: [subordinateId],
                    $exists: true
                }
            }]
        })
        if (alreadyHasSubordinate) {
            return {message: "Subordinate already exists"}
        }
        const session = await mongoose.startSession()
        await session.withTransaction(async () => {
            (await this.removeSubordinateFromBoss(subordinateId))
            (await UserModel.findOneAndUpdate({_id: bossId}, {
                role: UserRoles.BOSS,
                $push: {subordinates: subordinateId}
            }, {new: true}).select('-password'))
        })
        await session.endSession()

    }

    private async removeSubordinateFromBoss(subordinateId:string): Promise<any> {
        return (await UserModel.findOneAndUpdate({
            subordinates: {
                $all: [subordinateId],
                $exists: true
            }
        }, {$pull: {subordinates: subordinateId}}))
    }

    private async checkPermissionToSetRole(currentUserId:string,bossId:string, subordinateId:string) {
        const user = await UserModel.find({
            $and: [{_id: currentUserId}, {
                subordinates: {
                    $all: [bossId, subordinateId],
                    $exists: true
                }
            }]
        });
        return !!user
    }
}