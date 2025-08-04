import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsStrongPassword } from "class-validator";
import { IdExists } from "src/helper/decorator/check-sending-keys";
import { PropertyExists } from "src/helper/decorator/unique-validation";
import { EntitiesEnum } from "src/helper/enums/entities.enum";

export class CreateUserDto {
    @AutoMap()
    @ApiProperty({
        description: 'The email of the user',
        example: 'omarrasmy@gmail.com',
        uniqueItems: true,
    })
    @IsEmail()
    @PropertyExists(EntitiesEnum.USERS, ['email'])
    @IsNotEmpty()
    email: string;
    @AutoMap()
    @ApiProperty({
        description: 'The name of the user',
        example: 'Omar Rasmy',
    })
    @IsNotEmpty()
    name: string;
    @AutoMap()
    @ApiProperty({
        description: 'The password of the user',
        example: 'Omar@1234',
    })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password: string;
}
export class CreateUserWishlistDto {
    @AutoMap()
    @IsOptional()
    @IdExists([EntitiesEnum.MOVIES])
    moviesId: number;
}