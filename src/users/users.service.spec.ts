import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { USER_INTERFACE_REPOSITORY } from './interface/users.tokens';
import { RedisService } from 'src/common/redis/redis.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockRepo = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
    addMovieToWishlist: jest.fn(),
    deleteMovieToWishlist: jest.fn(),
  };

  const mockRedis = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: USER_INTERFACE_REPOSITORY, useValue: mockRepo },
        { provide: RedisService, useValue: mockRedis },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = { email: 'a@test.com', password: '123456', name: 'Test User' };
    await service.create(dto);
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
  });
  it('should find all users', async () => {
    await service.findAll();
    expect(mockRepo.findAll).toHaveBeenCalledWith({});
  });
  it('should find a user by ID', async () => {
    const userId = 2;
    await service.findOne(userId);
    expect(mockRedis.get).toHaveBeenCalledWith(`USER${userId}`);
    expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: userId }, relations: { wishlist: true } });
  });
  it('should update a user', async () => {
    const userId = 2;
    const dto = { name: 'Updated User' };
    await service.update(userId, dto);
    expect(mockRepo.update).toHaveBeenCalledWith(userId, dto);
    expect(mockRedis.del).toHaveBeenCalledWith(`USER${userId}`);
  });
  it('should soft delete a user', async () => {
    const userId = 3;
    await service.softDelete(userId);
    expect(mockRedis.del).toHaveBeenCalledWith(`USER${userId}`);
    expect(mockRepo.softDelete).toHaveBeenCalledWith({ where: { id: userId } });
  });
  it('should add a movie to wishlist', async () => {
    const userId = 1;
    const movieId = 5;
    await service.addMovieToWishlist(userId, movieId);
    expect(mockRepo.addMovieToWishlist).toHaveBeenCalledWith(userId, movieId);
    expect(mockRedis.del).toHaveBeenCalledWith(`USER${userId}`);
  });
  it('should delete a movie from wishlist', async () => {
    const userId = 1;
    const movieId = 5;
    await service.deleteMovieToWishlist(userId, movieId);
    expect(mockRepo.deleteMovieToWishlist).toHaveBeenCalledWith(userId, movieId);
    expect(mockRedis.del).toHaveBeenCalledWith(`USER${userId}`);
  });
  // Add similar tests for update, softDelete, addMovieToWishlist, etc.
});
