import { AutoMap } from "@automapper/classes";
import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDate, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, Max, Min } from "class-validator";
import { SupportedLanguage } from "../enums/languages.enum";
import { Transform, Type } from "class-transformer";
import { GenericFindAllDomainResponse } from "src/helper/dto/generic-domain-find-all-response.dto";
import { GenreResponseDto } from "src/genres/dto/find-genre.dto";
import { autoMap } from "@automapper/core";
import { Genres } from "src/genres/db/genres.entity";

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

    @AutoMap(() => [Genres])
    @ApiProperty({
        description: 'The genres associated with the movie',
        type: () => [GenreResponseDto],
    })
    genres: GenreResponseDto[];

}

export class MoviesQueryParams {
    @ApiProperty({
        description: 'The page number for pagination (default is 1)',
        example: 1,
        required: false,
    })
    @IsInt()
    @Min(1)
    @IsOptional()
    page?: number;
    @ApiProperty({
        description: 'The number of items per page for pagination default is 20',
        example: 10,
        required: false,
    })
    @IsInt()
    @Min(1)
    @IsOptional()
    limit?: number;
    @ApiProperty({
        description: 'The genre ID to filter movies by genre',
        required: false,
        type: () => [Number],
    })
    @Type(() => Number)
    @IsArray()
    @Transform(({ value }) => Array.isArray(value) ? value : [value])
    @IsOptional()
    genreId?: number[];
    @ApiProperty({
        description: 'The sort order for the movies (e.g., "popularity.desc", "release_date.asc")',
        example: 'popularity.desc',
        required: false,
    })
    @IsEnum(['popularity.asc', 'popularity.desc', 'release_date.asc', 'release_date.desc'])
    @IsOptional()
    sort?: string;
    @ApiProperty({
        description: 'The search query to filter movies by title or description',
        example: 'Inception',
        required: false,
    })
    @IsOptional()
    @IsNotEmpty({ message: 'Search query must not be empty' })
    search?: string;
    @ApiProperty({
        description: 'The minimum rating to filter movies by vote average',
        example: 7.0,
        required: false,
    })
    @IsOptional()
    @Min(0, { message: 'Minimum rating must be at least 0' })
    @Max(10, { message: 'Maximum rating must be at most 10' })
    minRating?: number;
    @ApiProperty({
        description: 'The maximum rating to filter movies by vote average',
        example: 10.0,
        required: false,
    })
    @IsOptional()
    @Min(0, { message: 'Maximum rating must be at least 0' })
    @IsInt()
    @Max(10, { message: 'Maximum rating must be at most 10' })
    maxRating?: number;
    @ApiProperty({
        description: 'The language to filter movies by original language',
        example: 'en',
        required: false,
    })
    @IsOptional()
    @IsEnum(SupportedLanguage)
    language?: string;
    @ApiProperty({
        description: 'The release date to filter movies by release date',
        example: '2010-07-16',
        required: false,
    })
    @IsOptional()
    @IsNotEmpty({ message: 'Release date must not be empty' })
    @IsDate({ message: 'Release date must be a valid date' })
    startReleaseDate?: Date;
    @ApiProperty({
        description: 'The end release date to filter movies by release date',
        example: '2010-07-16',
        required: false,
    })
    @IsOptional()
    @IsNotEmpty({ message: 'End release date must not be empty' })
    @IsDate({ message: 'End release date must be a valid date' })
    endReleaseDate?: Date;
    @ApiProperty({
        description: 'The adult content filter (true for adult content, false for non-adult content)',
        required: false
    })
    @IsOptional()
    @IsBoolean()
    @Transform(({ obj, }) => {
        if (obj?.adult == 'false' || obj?.adult == '0')
            return false;

        else if (obj?.adult == 'true' || obj?.adult == '1')
            return true;
    })
    adult?: boolean;
}

@ApiExtraModels(MovieResponseDto)
export class FindAllResponseForSwagger extends GenericFindAllDomainResponse<MovieResponseDto> {
    @ApiProperty({
        type: [MovieResponseDto],
    })
    data: MovieResponseDto[];
}