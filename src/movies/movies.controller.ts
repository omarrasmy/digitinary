import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { UpdateMovieDto, UpdateMovieRateDto } from './dto/update-movie.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiDocs } from 'src/helper/decorator/swagger';
import { GenericFindAllDomainResponse } from 'src/helper/dto/generic-domain-find-all-response.dto';
import { FindAllResponseForSwagger, MovieResponseDto, MoviesQueryParams } from './dto/find-movie.dto';
import { ParamCheck } from 'src/helper/decorator/check-parameters';
import { EntitiesEnum } from 'src/helper/enums/entities.enum';
import { CreateMovieRateDto } from './dto/create-movie.dto';
import { MovieRateResponseDto } from './dto/find-movie-rate.dto';
import { JwtPayload } from 'src/auth/decorator/jwtPayload.decorator';
import { JwtPayloadInterface } from 'src/auth/interface/jwtPayload.interface';

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
  @Post(':id/rate')
  @ApiDocs({
    summary: 'Rate Movie',
    body: CreateMovieRateDto,
    response: MovieRateResponseDto,
    statusCode: 201,
    isPublic: false,
  })
  @ApiParam({ name: 'id', type: Number, description: 'Movie ID' })
  rateMovie(@ParamCheck({ tableName: [EntitiesEnum.MOVIES], paramsToCheck: ['id'] }) param: { id: number },
    @Body() createMovieRateDto: CreateMovieRateDto,
    @JwtPayload() jwtPayload: JwtPayloadInterface
  ) {
    return this.moviesService.createRateMovie(param.id, jwtPayload.id, createMovieRateDto);
  }
  @Patch(':id/rate/:rateId')
  @ApiDocs({
    summary: 'Update Movie Rate',
    body: UpdateMovieRateDto,
    response: MovieRateResponseDto,
    statusCode: 200,
    isPublic: false,
  })
  @ApiParam({ name: 'id', type: Number, description: 'Movie ID' })
  @ApiParam({ name: 'rateId', type: Number, description: 'Rate ID' })
  updateRateMovie(
    @ParamCheck({ tableName: [EntitiesEnum.MOVIES, EntitiesEnum.MOVIERATES], paramsToCheck: ['id', 'rateId'] }) param: { id: number, rateId: number },
    @Body() updateMovieRateDto: UpdateMovieRateDto,
    @JwtPayload() jwtPayload: JwtPayloadInterface
  ) {
    return this.moviesService.updateRateMovie(param.rateId, updateMovieRateDto, jwtPayload.id, param.id);
  }
  @Delete(':id/rate/:rateId')
  @ApiDocs({
    summary: 'Delete Movie Rate',
    statusCode: 200,
    isPublic: false,
  })
  @ApiParam({ name: 'id', type: Number, description: 'Movie ID' })
  @ApiParam({ name: 'rateId', type: Number, description: 'Rate ID' })
  removeRateMovie(
    @ParamCheck({ tableName: [EntitiesEnum.MOVIES, EntitiesEnum.MOVIERATES], paramsToCheck: ['id', 'rateId'] }) param: { id: number, rateId: number },
    @JwtPayload() jwtPayload: JwtPayloadInterface
  ) {
    return this.moviesService.removeRateMovie(param.rateId, param.id, jwtPayload.id);
  }
}
