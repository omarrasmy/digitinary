import { PartialType } from '@nestjs/swagger';
import { CreateMovieDto } from './find-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) { }
