import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class MovieResponseDto {
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
    title: string;
    @AutoMap()
    @ApiProperty({
        description: 'The description of the movie',
        example: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
    })
    description: string;
    @AutoMap()
    @ApiProperty({
        description: 'The release date of the movie',
        example: '2010-07-16',
    })
    release_date: Date;
    @AutoMap()
    @ApiProperty({
        description: 'The average rating of the movie',
        example: 8.8,
    })
    vote_average: number;
    @AutoMap()
    @ApiProperty({
        description: 'The number of votes the movie has received',
        example: 2000000,
    })
    vote_count: number;
    @AutoMap()
    @ApiProperty({
        description: 'The popularity score of the movie',
        example: 85.5,
    })
    popularity: number;
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
    @AutoMap()
    @ApiProperty({
        description: 'The backdrop path of the movie',
        example: '/path/to/backdrop.jpg',
    })
    backdrop_path: string;
    @AutoMap()
    @ApiProperty({
        description: 'The poster path of the movie',
        example: '/path/to/poster.jpg',
    })
    poster_path: string;
    @AutoMap()
    @ApiProperty({
        description: 'Indicates if the movie is for adults',
        example: false,
    })
    adult: boolean;
    @AutoMap()
    @ApiProperty({
        description: 'Indicates if the movie has a video component',
        example: false,
    })
    video: boolean;
    @AutoMap()
    @ApiProperty({
        description: 'The overview of the movie',
        example: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
    })
    overview: string;

}
