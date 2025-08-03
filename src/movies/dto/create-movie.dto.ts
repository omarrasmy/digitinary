import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMovieDto {
    @AutoMap()
    @ApiProperty({
        description: 'The title of the movie',
        example: 'Inception',
    })
    title: string;

    @AutoMap()
    @ApiProperty({
        description: 'The original language of the movie',
        example: 'en',
    })
    original_language: string;

    @AutoMap()
    @ApiProperty({
        description: 'The original title of the movie',
        example: 'Inception',
    })
    original_title: string;
}