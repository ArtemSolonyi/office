import {IUser} from "../interfaces/IUser";
import bcrypt from "bcryptjs"
import {UserDto} from "../dto/user.dto";
import {UserRoles} from "../models/User";

export class User {
    public username: string;
    private readonly _password: string;
    private newHashPassword: string;
    public role: UserRoles

    constructor({username, password,}: UserDto, role: UserRoles) {
        this.username = username
        this._password = password
        this.role = role
    }

    public get password() {
        return this.newHashPassword
    }

    public async getInfoFromCreatedUser() {
        await this.hashingPassword()
        return {
            "username": this.username,
            "password": this.newHashPassword,
            "role": this.role
        }
    }

    private async hashingPassword() {
        const salt = await bcrypt.genSalt(5);
        this.newHashPassword = await bcrypt.hash(this._password, salt)
    }


}