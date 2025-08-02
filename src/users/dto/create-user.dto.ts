import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @AutoMap()
    @ApiProperty({
        description: 'The email of the user',
        example: 'omarrasmy@gmail.com',
        uniqueItems: true,
    })
    @IsEmail()
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
        example: 'Temp@123',
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
