import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { MOVIE_INTERFACE_REPOSITORY, MOVIE_RATES_INTERFACE_REPOSITORY } from './interface/movies.tokens';
import { RedisService } from 'src/common/redis/redis.service';
import { GenericFindAllDomainResponse } from 'src/helper/dto/generic-domain-find-all-response.dto';
import { MovieResponseDto } from './dto/find-movie.dto';
import { FindOneOptions, ILike } from 'typeorm';
import { Movies } from './db/movie.entity';
import { RedisKey } from 'src/common/redis/enums/redis-key.enums';
import { CreateMovieRateDto } from './dto/create-movie.dto';
import { BadRequestException } from '@nestjs/common';
import e from 'express';

describe('MoviesService', () => {
  let service: MoviesService;
  let mockRedisService = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };
  let mockMovieRepo = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    createFromQueryParamToFindOptions: jest.fn(),
    softDelete: jest.fn(),
  };
  let mockMovieRatesRepo = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    getAvarageRateByMovieId: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks(); // ⬅️ important

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: MOVIE_INTERFACE_REPOSITORY, useValue: mockMovieRepo },
        { provide: RedisService, useValue: mockRedisService },
        { provide: MOVIE_RATES_INTERFACE_REPOSITORY, useValue: mockMovieRatesRepo },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    jest.spyOn(service as any, 'checkRateMovieAuthorize').mockResolvedValue(true);
    // jest.spyOn(service as any, 'saveAvarageRate').mockResolvedValue(undefined);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all movies', async () => {
    const movies: MovieResponseDto[] = [
      {
        id: 1,
        title: 'Inception',
        description: 'A mind-bending thriller',
        release_date: new Date('2010-07-16'),
        vote_average: 8.8,
        vote_count: 2000000,
        popularity: 85.5,
        video: false,
        original_language: 'en',
        original_title: 'Inception',
        adult: false,
        backdrop_path: 'path/to/backdrop.jpg',
        poster_path: 'path/to/poster.jpg',
        overview: 'A thief uses dream-sharing technology for corporate espionage.',
      },
    ];

    const result: GenericFindAllDomainResponse<MovieResponseDto> = {
      data: movies,
      totalCount: 0,
      count: 0,
      currentPage: 1,
      nextPage: 2,
    };

    const queryParamResult: FindOneOptions<Movies> = {
      where: [
        { title: ILike('%Inception%'), original_language: 'en' },
        { original_title: ILike('%Inception%'), original_language: 'en' },
        { overview: ILike('%Inception%'), original_language: 'en' },
      ],
    };

    const queryParam = { language: 'en', page: 1, search: 'Inception' };

    mockMovieRepo.createFromQueryParamToFindOptions.mockReturnValue(queryParamResult);
    mockMovieRepo.findAll.mockResolvedValue(result);

    const serviceResult = await service.findAll(queryParam);

    expect(serviceResult).toEqual(result);
    expect(mockMovieRepo.createFromQueryParamToFindOptions).toHaveBeenCalledWith(queryParam);
    expect(mockMovieRepo.findAll).toHaveBeenCalled();

    // ✅ Safe way to check without exact object identity
    const calledArg = mockMovieRepo.findAll.mock.calls[0][0];
    expect(calledArg).toEqual(
      expect.objectContaining({
        where: expect.arrayContaining([
          expect.objectContaining({
            title: expect.any(Object),
            original_language: 'en',
          }),
          expect.objectContaining({
            original_title: expect.any(Object),
            original_language: 'en',
          }),
          expect.objectContaining({
            overview: expect.any(Object),
            original_language: 'en',
          }),
        ]),
      }),
    );

    // ✅ Optional: Check the ILike value
    expect(calledArg.where[0].title._value).toBe('%Inception%');
  });

  it('should find movie by id', async () => {
    const movie: MovieResponseDto = {
      id: 1,
      title: 'Inception',
      description: 'A mind-bending thriller',
      release_date: new Date('2010-07-16'),
      vote_average: 8.8,
      vote_count: 2000000,
      popularity: 85.5,
      video: false,
      original_language: 'en',
      original_title: 'Inception',
      adult: false,
      backdrop_path: 'path/to/backdrop.jpg',
      poster_path: 'path/to/poster.jpg',
      overview: 'A thief uses dream-sharing technology for corporate espionage.',
      genres: [
        { id: 1, name: 'Sci-Fi' },
        { id: 2, name: 'Thriller' },
      ],
    };
    mockRedisService.get.mockResolvedValue(null);
    mockRedisService.set.mockResolvedValue(undefined);
    mockMovieRepo.findOne.mockResolvedValue(movie);

    const result = await service.findOne(1);
    expect(result).toEqual(movie);
    expect(mockMovieRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: { genres: true } });
    expect(mockRedisService.get).toHaveBeenCalledWith(RedisKey.MOVIE + 1);
    expect(mockRedisService.set).toHaveBeenCalledWith(RedisKey.MOVIE + 1, movie);
  });

  it('should allow rating a movie if not rated before', async () => {
    const dto: CreateMovieRateDto = { rate: 4, comment: 'Great movie!' };
    const movieId = 1;
    const userId = 42;
    mockMovieRatesRepo.findAll.mockResolvedValue({ data: [], totalCount: 0, count: 0, currentPage: 1, nextPage: 2 });

    const expectedCreatedRate = { id: 100, rate: 4, usersId: userId, moviesId: movieId };
    mockMovieRatesRepo.create.mockResolvedValue(expectedCreatedRate);
    mockMovieRatesRepo.getAvarageRateByMovieId.mockResolvedValue({ count: 1, avarageRate: 4.0 });

    const result = await service.createRateMovie(movieId, userId, dto);
    expect(mockMovieRatesRepo.getAvarageRateByMovieId).toHaveBeenCalledWith(movieId);
    expect(mockMovieRatesRepo.findAll).toHaveBeenCalledWith({ where: { moviesId: movieId, usersId: userId } });
    expect(mockMovieRatesRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({ rate: dto.rate, comment: dto.comment, usersId: userId, moviesId: movieId })
    );
    expect(result).toEqual(expectedCreatedRate);
  });

  it('should throw if the user has already rated the movie', async () => {
    const dto: CreateMovieRateDto = { rate: 5 } as any;
    const movieId = 1;
    const userId = 42;
    const resultFindALl = { data: [{}, {}], totalCount: 1, count: 1, currentPage: 1, nextPage: 2 };
    mockMovieRatesRepo.findAll.mockResolvedValue(resultFindALl);

    await expect(service.createRateMovie(movieId, userId, dto)).rejects.toThrow(BadRequestException);
    expect(mockMovieRatesRepo.findAll).toHaveBeenCalledWith({ where: { moviesId: movieId, usersId: userId } });
    expect(mockMovieRatesRepo.create).not.toHaveBeenCalled();
    expect(mockMovieRatesRepo.getAvarageRateByMovieId).not.toHaveBeenCalled();
  });

  it('should update movie rate', async () => {
    const updateDto = { rate: 5, comment: 'Amazing movie!' };
    const userId = 1;
    const movieId = 1;
    const rateId = 1;
    const movieRate = { id: rateId, usersId: userId, moviesId: movieId, rate: 4, comment: 'Great movie!' };
    mockMovieRatesRepo.findOne.mockResolvedValue(movieRate);
    mockMovieRatesRepo.update.mockResolvedValue({ movieRate, ...updateDto });

    const result = await service.updateRateMovie(rateId, updateDto, userId, movieId);
    expect(service.checkRateMovieAuthorize).toHaveBeenCalledWith(rateId, userId, movieId);
    // expect(mockMovieRatesRepo.findOne).toHaveBeenCalledWith({ where: { id: rateId } });
    expect(mockMovieRatesRepo.update).toHaveBeenCalledWith(rateId, updateDto);
    // expect(service.saveAvarageRate).toHaveBeenCalledWith(movieRate.moviesId);
    expect(result).toEqual({ movieRate, ...updateDto });
  });

  it('should throw if user tries to update a rate they did not create', async () => {
    const updateDto = { rate: 5, comment: 'Amazing movie!' };
    const userId = 1;
    const movieId = 1;
    const rateId = 1;
    const movieRate = { id: rateId, usersId: 2, moviesId: movieId, rate: 4, comment: 'Amazing' }; // Different userId
    mockMovieRatesRepo.findOne.mockResolvedValue(movieRate);
    jest.spyOn(service as any, 'checkRateMovieAuthorize').mockImplementation(() => {
      throw new BadRequestException('You can only delete or update your own movie rates');
    });
    await expect(service.updateRateMovie(rateId, updateDto, userId, movieId)).rejects.toThrow(BadRequestException);
    expect(service.checkRateMovieAuthorize).toHaveBeenCalledWith(rateId, userId, movieId);
    expect(mockMovieRatesRepo.update).not.toHaveBeenCalled();
    expect(mockMovieRatesRepo.getAvarageRateByMovieId).not.toHaveBeenCalled();
  });

  it('should delete movie rate', async () => {
    const userId = 1;
    const movieId = 1;
    const rateId = 1;
    const movieRate = { id: rateId, usersId: userId, moviesId: movieId, rate: 5, comment: 'Great movie!' };
    mockMovieRatesRepo.findOne.mockResolvedValue(movieRate);
    mockMovieRatesRepo.delete.mockResolvedValue(undefined);
    mockMovieRatesRepo.getAvarageRateByMovieId.mockResolvedValue({ count: 10, avarageRate: 0 });

    await service.removeRateMovie(rateId, movieId, userId);
    expect(mockMovieRatesRepo.getAvarageRateByMovieId).toHaveBeenCalledWith(movieId);
    expect(service.checkRateMovieAuthorize).toHaveBeenCalledWith(rateId, userId, movieId);
    expect(mockMovieRatesRepo.delete).toHaveBeenCalledWith(rateId);
    expect(mockMovieRatesRepo.getAvarageRateByMovieId).toHaveBeenCalledWith(movieId);
  });


  it('should update movie', async () => {
    const updateDto = { title: 'Inception Updated' };
    const movieId = 1;
    const updatedMovie: MovieResponseDto = { ...updateDto, id: movieId, description: 'A mind-bending thriller', release_date: new Date('2010-07-16'), vote_average: 8.8, vote_count: 2000000, popularity: 85.5, video: false, original_language: 'en', original_title: 'Inception', adult: false, backdrop_path: 'path/to/backdrop.jpg', poster_path: 'path/to/poster.jpg', overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.' };
    mockMovieRepo.update.mockResolvedValue(updatedMovie);
    mockRedisService.del.mockResolvedValue(undefined);
    const result = await service.update(movieId, updateDto);
    expect(result).toEqual(updatedMovie);
    expect(mockMovieRepo.update).toHaveBeenCalledWith(movieId, updateDto);
    expect(mockRedisService.del).toHaveBeenCalledWith(RedisKey.MOVIE + movieId);
  });
  it('should delete movie', async () => {
    const movieId = 1;
    mockMovieRepo.softDelete.mockResolvedValue(undefined);
    mockRedisService.del.mockResolvedValue(undefined);
    const result = await service.remove(movieId);
    expect(result).toBeUndefined();
    expect(mockMovieRepo.softDelete).toHaveBeenCalledWith({ where: { id: movieId } });
    expect(mockRedisService.del).toHaveBeenCalledWith(RedisKey.MOVIE + movieId);
  });

});
