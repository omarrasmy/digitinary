import { AutoMap } from '@automapper/classes';
import { ApiExtraModels, ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';
// import { CreateMovieDto } from './find-movie.dto';

@ApiExtraModels(CreateMovieDto)
export class UpdateMovieDto extends PartialType(CreateMovieDto) {
}
