import { Inject, Injectable } from '@nestjs/common';
import { MovieResponseDto, MoviesQueryParams } from './dto/find-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MOVIE_INTERFACE_REPOSITORY, MOVIE_INTERFACE_SCHEMA_FACTORY } from './interface/movies.tokens';
import { MovieInterfaceRepository } from './interface/movie.interface.repository';
import { MovieInterfaceSchemaFactory } from './interface/movie.interface.schema.factory';
import { RedisService } from 'src/common/redis/redis.service';
import { RedisKey } from 'src/common/redis/enums/redis-key.enums';

@Injectable()
export class MoviesService {
  constructor(
    @Inject(MOVIE_INTERFACE_REPOSITORY)
    private readonly moviesRepository: MovieInterfaceRepository,
    @Inject(MOVIE_INTERFACE_SCHEMA_FACTORY)
    private readonly movieSchemaFactory: MovieInterfaceSchemaFactory,
    private readonly redisService: RedisService
  ) { }
  // create(createMovieDto: CreateMovieDto) {
  //   return 'This action adds a new movie';
  // }

  findAll(Query: MoviesQueryParams) {
    return this.moviesRepository.findAll(
      this.moviesRepository.createFromQueryParamToFindOptions(Query),
      Query.limit,
      Query.page
    );
  }

  async findOne(id: number): Promise<MovieResponseDto> {
    // Check Redis cache first
    const cachedMovie = await this.redisService.get<MovieResponseDto>(RedisKey.MOVIE + id);
    if (cachedMovie)
      return cachedMovie;

    const movie = await this.moviesRepository.findOne({ where: { id }, relations: { genres: true } });
    await this.redisService.set(RedisKey.MOVIE + id, movie);
    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    let movie = await this.moviesRepository.update(id, updateMovieDto);
    // Update the cache after updating the movie
    await this.redisService.set(RedisKey.MOVIE + id, movie);
    return movie;
    // return `This action updates a #${id} movie`;
  }

  async remove(id: number) {
    // Remove the movie from Redis cache
    await this.redisService.del(RedisKey.MOVIE + id);
    return this.moviesRepository.softDelete({
      where: {
        id
      }
    });
    // return `This action removes a #${id} movie`;
  }
}
