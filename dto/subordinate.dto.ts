import {IsNotEmpty, IsOptional, IsString, MinLength} from "class-validator";

export class UserIdDto {
    @IsNotEmpty()
    @IsString()
    userId: string
}

export class SubordinateDto extends UserIdDto {
    @IsNotEmpty()
    @IsString()
    bossId: string
    @IsNotEmpty()
    @IsString()
    subordinateId: string
}

