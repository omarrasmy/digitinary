import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class GenreResponseDto {
    @AutoMap()
    @ApiProperty({
        description: 'The unique identifier of the movie',
        example: 1,
    })
    id: number;
    @AutoMap()
    @ApiProperty({
        description: 'The title of the movie',
        example: 'Inception',
    })
    name: string;
}
