import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { USER_INTERFACE_REPOSITORY } from './interface/users.tokens';
import { RedisService } from 'src/common/redis/redis.service'; // Must match actual import path
import { RedisKey } from 'src/common/redis/enums/redis-key.enums';
import { MovieResponseDto } from 'src/movies/dto/find-movie.dto';
import { InternalUserDto, UserResponseDto } from './dto/find-user.dto';

const mockRedisService = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
};

const mockUserRepo = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  findOneInternal: jest.fn(),
  update: jest.fn(),
  softDelete: jest.fn(),
  addMovieToWishlist: jest.fn(),
  deleteMovieToWishlist: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    jest.clearAllMocks(); // ⬅️ important

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: USER_INTERFACE_REPOSITORY, useValue: mockUserRepo },
        { provide: RedisService, useValue: mockRedisService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const userDto = { name: 'Ali', email: 'ali@example.com' };
    const createdUser = { id: 1, ...userDto };
    mockUserRepo.create.mockResolvedValue(createdUser);

    const result = await service.create(userDto as any);
    expect(result).toEqual(createdUser);
    expect(mockUserRepo.create).toHaveBeenCalledWith(userDto);
  });
  it('should find all users', async () => {
    const users = [{ id: 1, name: 'Ali' }, { id: 2, name: 'Sara' }];
    mockUserRepo.findAll.mockResolvedValue(users);

    const result = await service.findAll();
    expect(result).toEqual(users);
    expect(mockUserRepo.findAll).toHaveBeenCalledWith({});
  });
  it('should find a user by ID', async () => {
    const user = { id: 1, name: 'Ali', wishlist: [] };

    // Arrange
    mockRedisService.get.mockResolvedValue(null); // Simulate Redis cache miss
    mockUserRepo.findOne.mockResolvedValue(user); // Simulate DB returning user
    mockRedisService.set.mockResolvedValue(user); // Simulate Redis set succeeding

    // Act
    const result = await service.findOne(1);

    // Assert
    expect(mockRedisService.get).toHaveBeenCalledWith(RedisKey.USER + user.id);
    expect(mockUserRepo.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: { wishlist: true },
    });
    expect(mockRedisService.set).toHaveBeenCalledWith(RedisKey.USER + user.id, user);
    expect(result).toEqual(user);
  });
  it('should update a user', async () => {
    const updateDto = { name: 'Updated Name' };
    const updatedUser = { id: 1, ...updateDto, wishlist: [] }; // Assuming wishlist is part of the user object
    mockUserRepo.update.mockResolvedValue(updatedUser);
    mockRedisService.del.mockResolvedValue(undefined);

    const result = await service.update(1, updateDto as any);
    expect(result).toEqual(updatedUser);
    expect(mockUserRepo.update).toHaveBeenCalledWith(1, updateDto);
    expect(mockRedisService.del).toHaveBeenCalledWith(RedisKey.USER + updatedUser.id);
  });
  it('should soft delete a user', async () => {
    const user = { id: 1, name: 'Ali' };
    mockRedisService.del.mockResolvedValue(undefined);
    mockUserRepo.softDelete.mockResolvedValue(user);

    const result = await service.softDelete(1);
    expect(result).toEqual(user);
    expect(mockRedisService.del).toHaveBeenCalledWith(RedisKey.USER + user.id);
    expect(mockUserRepo.softDelete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
  it('should add a movie to wishlist', async () => {
    const userId = 1;
    const movieId = 2;
    const movie: MovieResponseDto = {
      id: 10,
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
    const updatedUser: UserResponseDto = { createdAt: new Date(), updatedAt: new Date(), wishlist: [movie], email: 'omar@gmail.com', name: 'Omar' };
    mockUserRepo.addMovieToWishlist.mockResolvedValue(updatedUser);
    mockRedisService.del.mockResolvedValue(undefined);

    const result = await service.addMovieToWishlist(userId, movieId);
    expect(result).toEqual(updatedUser);
    expect(mockUserRepo.addMovieToWishlist).toHaveBeenCalledWith(userId, movieId);
    expect(mockRedisService.del).toHaveBeenCalledWith(RedisKey.USER + userId);
  });

  it('should delete a movie from wishlist', async () => {
    const userId = 1;
    const movieId = 2;
    const updatedUser: UserResponseDto = { createdAt: new Date(), updatedAt: new Date(), wishlist: [], email: 'omar@gmail.com', name: 'Omar' };
    mockUserRepo.deleteMovieToWishlist.mockResolvedValue(updatedUser);
    mockRedisService.del.mockResolvedValue(undefined);
    const result = await service.deleteMovieToWishlist(userId, movieId);
    expect(result).toEqual(updatedUser);
    expect(mockUserRepo.deleteMovieToWishlist).toHaveBeenCalledWith(userId, movieId);
    expect(mockRedisService.del).toHaveBeenCalledWith(RedisKey.USER + userId);
  });
  it('should find one internal user', async () => {
    const options = { where: { id: 1 } };
    const internalUser: InternalUserDto = { wishlist: [], id: 1, name: 'Internal User', email: 'omar@gmail.com', password: 'hashedpassword', createdAt: new Date(), updatedAt: new Date() };

    mockUserRepo.findOneInternal.mockResolvedValue(internalUser);
    const result = await service.findOneInternal(options);
    expect(result).toEqual(internalUser);
    expect(mockUserRepo.findOneInternal).toHaveBeenCalledWith(options);
  });

});
