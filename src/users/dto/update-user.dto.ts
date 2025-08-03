import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class UpdateUserDto {
    @IsOptional()
    @ApiProperty({
        description: 'The email of the user',
        example: 'omar'
    })
    @AutoMap()
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
    @IsOptional()
    password: string;

}
