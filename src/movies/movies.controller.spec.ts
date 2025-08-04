import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { GenericFindAllDomainResponse } from 'src/helper/dto/generic-domain-find-all-response.dto';
import { MovieResponseDto, MoviesQueryParams } from './dto/find-movie.dto';
import { CreateMovieDto, CreateMovieRateDto } from './dto/create-movie.dto';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  let mockMovieService = {
    //list all movies
    findAll: jest.fn(),
    //get movie by id
    findOne: jest.fn(),
    //update movie
    update: jest.fn(),
    remove: jest.fn(),
    createRateMovie: jest.fn(),
    updateRateMovie: jest.fn(),
    deleteRateMovie: jest.fn(),
    removeRateMovie: jest.fn(),
  }
  beforeEach(async () => {
    jest.clearAllMocks(); // ⬅️ important
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService
        , { provide: MoviesService, useValue: mockMovieService }
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return all movies array', async () => {
    let movie: MovieResponseDto = {
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
      overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
    };
    const result: GenericFindAllDomainResponse<MovieResponseDto> = {
      data: [movie],
      totalCount: 0,
      count: 1,
      currentPage: 1,
      nextPage: 2,
    };
    const queryParam: MoviesQueryParams = {
      language: 'en',
      page: 1,
      search: 'Inception',
    }
    mockMovieService.findAll.mockResolvedValue(result);
    let controllerResult = await controller.findAll(queryParam);
    expect(controllerResult).toEqual(result);
    expect(mockMovieService.findAll).toHaveBeenCalledWith(queryParam);

  })

  it('should return movie by id', async () => {
    let movie: MovieResponseDto = {
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
      overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
      genres: [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Sci-Fi' }
      ]
    };
    mockMovieService.findOne.mockResolvedValue(movie);
    let controllerResult = await controller.findOne({ id: 1 });
    expect(controllerResult).toEqual(movie);
    expect(mockMovieService.findOne).toHaveBeenCalledWith(1);
  });

  it('should update movie', async () => {
    let movie: MovieResponseDto = {
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
      overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
      genres: [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Sci-Fi' }
      ]
    };
    mockMovieService.update.mockResolvedValue(movie);
    let controllerResult = await controller.update({ id: 1 }, movie);
    expect(controllerResult).toEqual(movie);
    expect(mockMovieService.update).toHaveBeenCalledWith(1, movie);
  });

  it('should delete movie', async () => {
    mockMovieService.remove.mockResolvedValue(undefined);
    let controllerResult = await controller.remove({ id: 1 });
    expect(controllerResult).toBeUndefined();
    expect(mockMovieService.remove).toHaveBeenCalledWith(1);
  });

  it('should create movie rate', async () => {
    let movieRate: CreateMovieRateDto = {
      rate: 5,
      comment: 'Great movie!',
    };
    mockMovieService.createRateMovie.mockResolvedValue({ ...movieRate, usersId: 1, moviesId: 1, id: 1 });
    let controllerResult = await controller.rateMovie({ id: 1 }, movieRate, { id: 1, email: '', name: 'Test User' });
    expect(controllerResult).toEqual({ ...movieRate, usersId: 1, moviesId: 1, id: 1 });
    expect(mockMovieService.createRateMovie).toHaveBeenCalledWith(1, 1, movieRate);
  });

  it('should update movie rate', async () => {
    let movieRate: CreateMovieRateDto = {
      rate: 7,
      comment: 'Good movie!',
    };
    mockMovieService.updateRateMovie.mockResolvedValue({ ...movieRate, usersId: 1, moviesId: 1, id: 1 });
    let controllerResult = await controller.updateRateMovie({ id: 1, rateId: 1 }, movieRate, { id: 1, email: '', name: 'Test User' });
    expect(controllerResult).toEqual({ ...movieRate, usersId: 1, moviesId: 1, id: 1 });
    expect(mockMovieService.updateRateMovie).toHaveBeenCalledWith(1, movieRate, 1, 1);
  });

  it('should delete movie rate', async () => {
    let controllerResult = await controller.removeRateMovie({ id: 1, rateId: 1 }, { id: 1, email: '', name: 'Test User' });
    mockMovieService.removeRateMovie.mockResolvedValue(undefined);
    expect(mockMovieService.removeRateMovie).toHaveBeenCalledWith(1, 1, 1);
    expect(controllerResult).toBeUndefined();
  });
});
