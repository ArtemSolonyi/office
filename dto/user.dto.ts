import {IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength} from "class-validator";

export class UserDto {
    @IsString()
    @MinLength(7)
    username:string
    @IsString()
    @MinLength(7)
    password: string
}

export class RefreshSecureDto {
    @IsString()
    refreshToken:string
}