import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsOptional, Max, Min } from "class-validator";

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
    @AutoMap()
    vote_count: number;
    @AutoMap()
    vote_average: number;
}

export class CreateMovieRateDto {
    @AutoMap()
    @ApiProperty({
        description: 'The rating given to the movie',
        example: 8.5,
    })
    @IsNumber()
    @Max(10, {
        message: 'Rate must be less than or equal to 10',
    })
    @Min(1, {
        message: 'Rate must be greater than or equal to 1',
    })
    rate: number;
    @AutoMap()
    @ApiProperty({
        description: 'The review or comment about the movie',
        example: 'Amazing movie with a mind-bending plot!',
    })
    @IsOptional()
    comment: string;
    @AutoMap()
    @IsOptional()
    usersId?: number;

    @AutoMap()
    @IsOptional()
    moviesId?: number;
}