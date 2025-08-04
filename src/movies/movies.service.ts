import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { MovieResponseDto, MoviesQueryParams } from './dto/find-movie.dto';
import { UpdateMovieDto, UpdateMovieRateDto } from './dto/update-movie.dto';
import { MOVIE_INTERFACE_REPOSITORY, MOVIE_INTERFACE_SCHEMA_FACTORY, MOVIE_RATES_INTERFACE_REPOSITORY } from './interface/movies.tokens';
import { MovieInterfaceRepository } from './interface/movie.interface.repository';
import { MovieInterfaceSchemaFactory } from './interface/movie.interface.schema.factory';
import { RedisService } from 'src/common/redis/redis.service';
import { RedisKey } from 'src/common/redis/enums/redis-key.enums';
import { CreateMovieRateDto } from './dto/create-movie.dto';
import { MovieRatesInterfaceRepository } from './interface/movie-rate.interface.repository';

@Injectable()
export class MoviesService {

  constructor(
    @Inject(MOVIE_INTERFACE_REPOSITORY)
    private readonly moviesRepository: MovieInterfaceRepository,
    @Inject(MOVIE_INTERFACE_SCHEMA_FACTORY)
    private readonly movieSchemaFactory: MovieInterfaceSchemaFactory,
    private readonly redisService: RedisService,
    @Inject(MOVIE_RATES_INTERFACE_REPOSITORY)
    private readonly movieRatesRepository: MovieRatesInterfaceRepository,
  ) { }
  // create(createMovieDto: CreateMovieDto) {
  //   return 'This action adds a new movie';
  // }

  async createRateMovie(id: number, userId: number, createMovieRateDto: CreateMovieRateDto) {
    createMovieRateDto.usersId = userId;
    createMovieRateDto.moviesId = id;
    // Check if the movie exists
    let tempMovieRate = await this.movieRatesRepository.findAll({ where: { moviesId: id, usersId: userId } });
    if (tempMovieRate.data.length > 0) {
      throw new BadRequestException('You have already rated this movie');
    }
    // Create the movie rate
    let movieRate = await this.movieRatesRepository.create(createMovieRateDto);
    await this.saveAvarageRate(id);
    return movieRate;
  }
  async saveAvarageRate(id) {
    let rateResult = await this.movieRatesRepository.getAvarageRateByMovieId(id);
    return this.update(id, { vote_count: rateResult.count, vote_average: rateResult.avarageRate ?? 0.0 });
  }
  async checkRateMovieAuthorize(id: number, userId: number, movieId: number) {
    let rate = await this.movieRatesRepository.findOne({ where: { id } });
    if (rate.usersId !== userId) {
      throw new BadRequestException('You can only delete or update your own movie rates');
    }
    if (rate.moviesId !== movieId) {
      throw new BadRequestException('This rate does not belong to the specified movie');
    }
  }
  async updateRateMovie(rateId: number, updateMovieRateDto: UpdateMovieRateDto, userId: number, movieId: number) {
    // Check if the rate exists and belongs to the user
    await this.checkRateMovieAuthorize(rateId, userId, movieId);
    let movieRate = await this.movieRatesRepository.update(rateId, updateMovieRateDto);
    // Update the average rate after updating the rate
    await this.saveAvarageRate(movieRate.moviesId);
    return movieRate;
  }
  async removeRateMovie(rateId: number, movieId: number, userId: number) {
    // Check if the rate exists
    await this.checkRateMovieAuthorize(rateId, userId, movieId);
    await this.movieRatesRepository.delete(rateId);
    await this.saveAvarageRate(movieId);
    return;
  }
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
    await this.redisService.del(RedisKey.MOVIE + id);
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
