import { Inject, Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenreQueryParamsDto } from './dto/find-genre.dto';
import { GENRE_INTERFACE_REPOSITORY, GENRE_INTERFACE_SCHEMA_FACTORY } from './interface/genres.tokens';
import { GenresRepository } from './db/genres.repository';
import { GenreSchemaFactory } from './db/genre.schema.factory';

@Injectable()
export class GenresService {
  constructor(
    @Inject(GENRE_INTERFACE_REPOSITORY)
    private readonly genresRepository: GenresRepository
  ) { }
  findAll(Query: GenreQueryParamsDto) {
    return this.genresRepository.findAll(
      this.genresRepository.createFromQueryParamToFindOptions(Query),
      Query.limit,
      Query.page
    );
  }

}
