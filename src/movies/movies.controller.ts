import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiDocs } from 'src/helper/decorator/swagger';
import { GenericFindAllDomainResponse } from 'src/helper/dto/generic-domain-find-all-response.dto';
import { FindAllResponseForSwagger, MovieResponseDto, MoviesQueryParams } from './dto/find-movie.dto';
import { ParamCheck } from 'src/helper/decorator/check-parameters';
import { EntitiesEnum } from 'src/helper/enums/entities.enum';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  // @Post()
  // create(@Body() createMovieDto: CreateMovieDto) {
  //   return this.moviesService.create(createMovieDto);
  // }

  @Get()
  @ApiDocs({
    summary: 'Get All Movies',
    response: FindAllResponseForSwagger,
    statusCode: 200,
    isPublic: false,
  })
  findAll(
    @Query() Query: MoviesQueryParams
  ) {
    return this.moviesService.findAll(Query);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Movie ID' })
  @ApiDocs({
    summary: 'Get Movie by ID',
    response: MovieResponseDto,
    statusCode: 200,
    isPublic: false,
  })
  findOne(@ParamCheck({ tableName: [EntitiesEnum.MOVIES], paramsToCheck: ['id'] }) param: { id: number }) {
    return this.moviesService.findOne(param.id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Movie ID' })
  @ApiDocs({
    summary: 'Update Movie',
    body: UpdateMovieDto,
    response: MovieResponseDto,
    statusCode: 200,
    isPublic: false,
  })
  update(@ParamCheck({ tableName: [EntitiesEnum.MOVIES], paramsToCheck: ['id'] }) param: { id: number }
    , @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(param.id, updateMovieDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Movie ID' })
  @ApiDocs({
    summary: 'Delete Movie',
    statusCode: 200,
    isPublic: false,
  })
  remove(@ParamCheck({ tableName: [EntitiesEnum.MOVIES], paramsToCheck: ['id'] }) param: { id: number }) {
    return this.moviesService.remove(param.id);
  }
}
