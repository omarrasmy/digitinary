import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GenericFindAllDomainResponse } from 'src/helper/dto/generic-domain-find-all-response.dto';
import { UserResponseDto } from './dto/find-user.dto';
import { MovieResponseDto } from 'src/movies/dto/find-movie.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
    addMovieToWishlist: jest.fn(),
    deleteMovieToWishlist: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks(); // ⬅️ important

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create on service', async () => {
    const dto: CreateUserDto = { email: 'test@test.com', password: '123456', name: 'Test User' };
    let user: UserResponseDto = {
      email: dto.email,
      name: dto.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      wishlist: [],
    };
    mockUsersService.create.mockResolvedValue(user);
    let result = await controller.create(dto);
    expect(mockUsersService.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(user);
  });

  it('should get all users', async () => {

    let data: GenericFindAllDomainResponse<UserResponseDto> = {
      data: [
        {
          email: 'omar@gmail.com',
          name: 'Omar',
          createdAt: new Date(),
          updatedAt: new Date(),
          wishlist: []
        }
      ],
      totalCount: 0,
      count: 0,
      currentPage: 1,
      nextPage: null,
    };
    mockUsersService.findAll.mockResolvedValue(data);
    let result = await controller.findAll();
    expect(mockUsersService.findAll).toHaveBeenCalled();
    expect(result).toEqual(data);
  });

  it('should get user by ID', async () => {
    let user: UserResponseDto = {
      email: 'omar@gmail.com',
      name: 'Omar',
      createdAt: new Date(),
      updatedAt: new Date(),
      wishlist: [],
    }

    mockUsersService.findOne.mockResolvedValue(user);
    let result = await controller.findOne({ id: 1 });
    expect(mockUsersService.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(user);
  });

  it('should update user', async () => {
    const dto: UpdateUserDto = { name: 'Ali' };
    let userUpdated: UserResponseDto = {
      email: 'omar@gmail.com',
      name: 'omar',
      createdAt: new Date(),
      updatedAt: new Date(),
      wishlist: [],
    }
    mockUsersService.update.mockResolvedValue({ userUpdated, ...dto });
    let result = await controller.update({ id: 1 }, dto);
    expect(mockUsersService.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual({ userUpdated, ...dto });
  });

  it('should delete user', async () => {
    mockUsersService.softDelete.mockResolvedValue(undefined);
    await controller.remove({ id: 1 });
    expect(mockUsersService.softDelete).toHaveBeenCalledWith(1);
  });

  it('should add movie to wishlist', async () => {
    const movie: MovieResponseDto = {
      id: 1,
      title: 'Inception',
      description: 'A mind-bending thriller',
      release_date: new Date(),
      genres: [],
      vote_average: 8.8,
      vote_count: 1000,
      poster_path: 'path/to/poster.jpg',
      backdrop_path: 'path/to/backdrop.jpg',
      popularity: 9.5,
      original_language: 'en',
      original_title: 'Inception',
      adult: false,
      video: false,
      overview: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
    };
    let user: UserResponseDto = {
      email: 'omar@gmail.com',
      name: 'Omar',
      createdAt: new Date(),
      updatedAt: new Date(),
      wishlist: [movie],
    }
    mockUsersService.addMovieToWishlist.mockResolvedValue(user);
    let result = await controller.addMovieToWishlist({ id: 1 }, { movieId: 1 });
    expect(mockUsersService.addMovieToWishlist).toHaveBeenCalledWith(1, 1);
    expect(result).toEqual(user);

  });

  it('should remove movie from wishlist', async () => {
    const movie: MovieResponseDto = {
      id: 1,
      title: 'Inception',
      description: 'A mind-bending thriller',
      release_date: new Date(),
      genres: [],
      vote_average: 8.8,
      vote_count: 1000,
      poster_path: 'path/to/poster.jpg',
      backdrop_path: 'path/to/backdrop.jpg',
      popularity: 9.5,
      original_language: 'en',
      original_title: 'Inception',
      adult: false,
      video: false,
      overview: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
    };
    let user: UserResponseDto = {
      email: 'omar@gmail.com',
      name: 'Omar',
      createdAt: new Date(),
      updatedAt: new Date(),
      wishlist: [movie],
    }
    mockUsersService.deleteMovieToWishlist.mockResolvedValue(user);
    let result = await controller.removeMovieFromWishlist({ id: 1 }, { movieId: 2 });
    expect(mockUsersService.deleteMovieToWishlist).toHaveBeenCalledWith(1, 2);
    expect(result).toEqual(user);
    expect(user.wishlist).not.toContainEqual({ ...movie, id: 2 });
  });
});
