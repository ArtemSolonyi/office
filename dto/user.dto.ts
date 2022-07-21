import { IsString, MinLength} from "class-validator";

export class UserDto {
    @IsString()
    @MinLength(4)
    username:string
    @IsString()
    @MinLength(7)
    password: string
}

export class RefreshSecureDto {
    @IsString()
    refreshToken:string
}