import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  ValidateIf,
  Matches,
  IsStrongPassword,
} from 'class-validator';


export class LoginRequest {
  @IsEmail()
  @AutoMap()
  @ApiProperty({ type: String, example: 'omarrasmy@gmail.com' })
  email: string;
  @AutoMap()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @ApiProperty({ type: String, example: 'Omar@1234' })
  password: string;
}
