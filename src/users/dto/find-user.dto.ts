import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
    @AutoMap()
    @ApiProperty({
        description: 'The unique identifier of the user',
        example: 1,
    })
    id: number;
    @AutoMap()
    @ApiProperty({
        description: 'The email of the user',
        example: 'omarrasmy@gmail.com'
    })
    email: string;
    @AutoMap()
    @ApiProperty({
        description: 'The name of the user',
        example: 'Omar Rasmy'
    })
    name: string;

    @AutoMap()
    @ApiProperty({
        description: 'The creation date of the user',
        example: '2023-10-01T12:00:00Z'
    })
    createdAt: Date;
}

export class InternalUserDto extends UserResponseDto {
    @AutoMap()
    password: string;
}