import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { UserResponseDto } from "src/users/dto/find-user.dto";

export class MovieRateResponseDto {
    @AutoMap()
    @ApiProperty({
        description: 'The ID of the movie rate',
        example: 1,
    })
    id: number;

    @AutoMap()
    @ApiProperty({
        description: 'The rating given to the movie',
        example: 4.5,
    })
    rate: number;

    @AutoMap()
    @ApiProperty({
        description: 'The ID of the user who rated the movie',
        example: 123,
    })
    usersId: number;
    @AutoMap()
    @ApiProperty({
        description: 'The ID of the movie being rated',
        example: 456,
    })
    moviesId: number;
    @AutoMap()
    @ApiProperty({
        description: 'The comment or review about the movie',
        example: 'An amazing cinematic experience!',
    })
    comment: string;
    @AutoMap()
    @ApiProperty({
        description: 'The date when the movie rate was created',
        type: () => UserResponseDto
    })
    user: UserResponseDto
}