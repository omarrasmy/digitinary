import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiDocs } from 'src/helper/decorator/swagger';
import { GenreFindAllResponseForSwagger, GenreQueryParamsDto } from './dto/find-genre.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) { }

  @Get()
  @ApiDocs({
    summary: 'Get All Genres',
    response: GenreFindAllResponseForSwagger,
    statusCode: 200,
    isPublic: false,
  })
  findAll(
    @Query() query: GenreQueryParamsDto
  ) {
    return this.genresService.findAll(query);
  }
}
