import { AutoMap } from '@automapper/classes';
import { ApiExtraModels, ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { CreateMovieDto, CreateMovieRateDto } from './create-movie.dto';
// import { CreateMovieDto } from './find-movie.dto';

@ApiExtraModels(CreateMovieDto)
export class UpdateMovieDto extends PartialType(CreateMovieDto) {
}

export class UpdateMovieRateDto {
    @AutoMap()
    @ApiProperty({
        description: 'The rating given to the movie',
        example: 8.5,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @Max(10, {
        message: 'Rate must be less than or equal to 10',
    })
    @Min(1, {
        message: 'Rate must be greater than or equal to 1',
    })
    rate?: number;

    @AutoMap()
    @ApiProperty({
        description: 'The review or comment about the movie',
        example: 'Amazing movie with a mind-bending plot!',
        required: false,
    })
    @IsOptional()
    comment?: string;
}