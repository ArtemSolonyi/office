import bcrypt from "bcryptjs";
export class User {
    constructor({ username, password, }, role) {
        this.username = username;
        this._password = password;
        this.role = role;
    }
    get password() {
        return this.newHashPassword;
    }
    async getInfoFromCreatedUser() {
        await this.hashingPassword();
        return {
            "username": this.username,
            "password": this.newHashPassword,
            "role": this.role
        };
    }
    async hashingPassword() {
        const salt = await bcrypt.genSalt(5);
        this.newHashPassword = await bcrypt.hash(this._password, salt);
    }
}
//# sourceMappingURL=user.service.js.map