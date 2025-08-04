import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { GenericFindAllDomainResponse } from "src/helper/dto/generic-domain-find-all-response.dto";
import { MovieResponseDto } from "src/movies/dto/find-movie.dto";

export class UserResponseDto {

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
    @AutoMap()
    @ApiProperty({
        description: 'The last update date of the user',
        example: '2023-10-01T12:00:00Z'
    })
    updatedAt: Date;
    @AutoMap()
    @ApiProperty({
        description: 'The list of wishlist movies associated with the user',
        type: () => [MovieResponseDto],
    })
    wishlist: MovieResponseDto[];

}

export class InternalUserDto extends UserResponseDto {
    @AutoMap()
    @ApiProperty({
        description: 'The unique identifier of the user',
        example: 1,
    })
    id: number;
    @AutoMap()
    password: string;
}
export class UserFindAllForSwagger extends GenericFindAllDomainResponse<UserResponseDto> {
    @AutoMap()
    @ApiProperty({
        description: 'The list of users',
        type: () => [UserResponseDto],
    })
    data: UserResponseDto[];
}